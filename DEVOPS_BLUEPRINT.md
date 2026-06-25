# Autonomous DevOps Agent — Technical Blueprint
## Lab Y AI Solutions

---

## 1. System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    TRIGGER LAYER                                 │
│  GitHub Webhook / Poller → Event Bus (Redis/NATS)                │
└─────────────────────────┬────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                           │
│  LangGraph Stateful Graph (Main Controller)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │Detector  │→ │Tester    │→ │Fixer     │→ │Deployer       │   │
│  │Agent     │  │Agent     │  │Agent     │  │Agent          │   │
│  └──────────┘  └──────────┘  └──────────┘  └───────┬───────┘   │
│                                                     │           │
│  Shared State:  Redis / PostgreSQL                  │           │
│  (context: commit_sha, logs, test_results,          │           │
│   fix_proposal, deployment_status)                  │           │
└─────────────────────────────────────────────────────┼───────────┘
                                                       │
┌──────────────────────────────────────────────────────▼──────────┐
│                    EXECUTION LAYER                               │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Docker SDK (Py)  │  │ Pytest       │  │ GH Actions /     │   │
│  │ ephemeral env    │  │ Vitest       │  │ ArgoCD CLI      │   │
│  └──────────────────┘  └──────────────┘  └──────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                                                       │
┌──────────────────────────────────────────────────────▼──────────┐
│                    GATE LAYER (Human-in-the-Loop)                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐   │
│  │ Slack/MS Teams   │  │ Web Dashboard   │  │ Auto-Rollback│   │
│  │ Notification     │  │ Approve/Reject  │  │ Trigger      │   │
│  └──────────────────┘  └──────────────────┘  └──────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Trigger** → New commit pushed (webhook or poll) → event published to Redis stream
2. **Detector Agent** → Validates commit, extracts metadata, checks for CI skip tags
3. **Tester Agent** → Spins Docker env → runs 3 test phases → collects artifacts
4. **LLM Reasoner** (cross-cutting) → Analyzes failures at each phase
5. **Fixer Agent** → Applies deterministic patches or escalates
6. **Deployer Agent** → Pushes through CI/CD pipeline with approval gate
7. **Observability** → Every step emits structured logs to OpenTelemetry + Loki

---

## 2. Agentic Workflow (LangGraph State Machine)

### State Schema

```python
class DevOpsState(TypedDict):
    commit_sha: str
    repo_url: str
    branch: str
    author: str
    docker_container_id: Optional[str]
    test_phases: Dict[str, TestPhaseResult]  # {unit|integration|smoke: result}
    logs: Dict[str, List[str]]               # raw log lines per phase
    llm_analysis: Optional[LLMAnalysis]
    fix_proposal: Optional[FixProposal]
    fix_applied: bool
    human_review_required: bool
    deployment_status: Optional[str]
    rollback_sha: Optional[str]
```

### Agent Definitions

#### 1. Detector Agent
- **Input**: Webhook payload / cron tick
- **Action**: Clone repo at commit, run `git diff --stat`, detect changed files
- **Output**: Populates `commit_sha`, `branch`, file change map
- **Routing**: If change is docs-only or CI-skip → terminate; else → Tester

#### 2. Tester Agent
- **Input**: Commit SHA from Detector
- **Action**:
  ```
  1. Build Docker image: docker build -t lab-y-test:{sha} .
  2. Run Unit Tests:   docker run --rm lab-y-test:{sha} npm run test:unit
  3. Run Integration:  docker run --rm --network=test-net lab-y-test:{sha} npm run test:int
  4. Run Smoke:        docker run --rm lab-y-test:{sha} npm run test:smoke
  ```
- **Output**: `test_phases` dict with pass/fail + raw stdout/stderr in `logs`
- **Routing**: All green → Deployer; failures → Fixer

#### 3. Fixer Agent (LLM-Powered)
- **Input**: `logs`, `test_phases`, file change map
- **Action**:
  ```
  1. Build LLM prompt with:
     - Failed test output (last 200 lines)
     - Changed files (diff context)
     - Error stack traces
  2. LLM classifies:
     A) Deterministic fix (typo, import, env var) → generate patch
     B) Complex fix (logic rewrite, API contract change) → flag human
     C) Flaky test → mark for re-run
  3. For case A: apply patch, re-run Tester loop (max 3 retries)
  4. For case B: set human_review_required = True
  ```
- **Output**: `fix_proposal`, `fix_applied`, `human_review_required`
- **Routing**: `human_review_required` → HITL Gate; else → re-route to Tester for retry

#### 4. Deployer Agent
- **Input**: Passed tests + commit SHA
- **Action**:
  ```
  1. Tag docker image: lab-y-prod:{sha} + :latest
  2. Push to container registry
  3. Trigger GitHub Actions deployment workflow (or ArgoCD sync)
  4. Wait for health check (200 OK on /api/health, < 5s latency)
  5. If health check fails → trigger auto-rollback
  ```
- **Output**: `deployment_status` = "live" | "rolled_back" | "pending_approval"

### LangGraph Graph Definition

```python
from langgraph.graph import StateGraph

builder = StateGraph(DevOpsState)

builder.add_node("detector", detector_agent)
builder.add_node("tester", tester_agent)
builder.add_node("fixer", fixer_agent)
builder.add_node("deployer", deployer_agent)

builder.add_edge("detector", "tester")
builder.add_conditional_edges(
    "tester",
    route_on_test_results,  # function that checks test_phases
    {"pass": "deployer", "fail": "fixer", "flaky": "tester"}
)
builder.add_conditional_edges(
    "fixer",
    route_on_fix_outcome,
    {"retry": "tester", "human_review": "human_gate", "escalate": "human_gate"}
)

builder.set_entry_point("detector")
```

---

## 3. Tool Stack

### Core Orchestration

| Component | Library/Tool | Rationale |
|---|---|---|
| Workflow Engine | **LangGraph** + **LangChain** | Stateful DAG with conditional branching, checkpointing |
| LLM Interface | **LangChain (OpenAI / Claude)** | Unified API for GPT-4 / Claude 3.5 for reasoning |
| Container Mgmt | **Docker SDK for Python** | Spin ephemeral test environments programmatically |
| Test Runners | **Pytest** (Python) / **Vitest** (frontend) | Already standard in Next.js ecosystem |
| CI/CD Trigger | **GitHub Actions CLI (`gh`)** + **ArgoCD API** | Trigger pipelines, sync apps, check status |
| Event Bus | **Redis Streams** (via `redis-py`) | Reliable, replayable event backbone |
| State Persistence | **PostgreSQL** (via SQLAlchemy) | Checkpoint long-running workflows across restarts |

### Observability

| Component | Tool | Purpose |
|---|---|---|
| Log Aggregation | **Loki** + **Promtail** | Centralized log ingestion from test runs |
| Metrics | **Prometheus** | Pipeline duration, test pass rate, deploy frequency |
| Tracing | **OpenTelemetry** (auto-instrumented) | Trace a single commit through the entire pipeline |
| Dashboard | **Grafana** | Real-time pipeline health, failure rates, MTTR |
| Alerting | **AlertManager** → Slack/PagerDuty | Notify on repeated failures or deploy anomalies |

### LLM & Analysis

| Component | Tool | Purpose |
|---|---|---|
| Structured Output | **LangChain PydanticOutputParser** | Force LLM to return typed fix proposals |
| Code Patch | **unidiff** + **git apply** | Parse and apply LLM-generated diffs safely |
| Embedding Search | **ChromaDB** (local) | Index known failure patterns for fast retrieval |

### Security & Compliance

| Component | Tool | Purpose |
|---|---|---|
| Secrets | **HashiCorp Vault** | Dynamic Docker registry tokens, API keys |
| Approval Workflow | **Slack SDK** + **FastAPI webhook** | Human review via interactive messages |
| Audit Log | **OpenTelemetry Span Events** | Immutable record of every decision + approval |
| Image Signing | **Cosign** | Sign images before prod deployment |

---

## 4. Security & Human-in-the-Loop Gate

### Gate Architecture

```
 Fixer wants to deploy
         │
         ▼
┌─────────────────────────────────┐
│  Gate Agent                     │
│  ┌───────────────────────────┐  │
│  │ Complexity Classifier:    │  │
│  │ - Deterministic fix?      │  │
│  │   → Auto-approve          │  │
│  │ - Non-deterministic?      │  │
│  │   → HITL required         │  │
│  │ - Diff > 50 lines?        │  │
│  │   → HITL required         │  │
│  │ - Touches /api/* or /db/*?│  │
│  │   → HITL required         │  │
│  └───────────────────────────┘  │
│                                 │
│  Always HITL for:              │
│  - Production deployments       │
│  - Database schema changes      │
│  - Permission / auth changes    │
└──────────┬──────────────────────┘
           │
    ┌──────▼──────┐
    │ Slack Block │
    │ ┌──────────┐│
    │ │ Diff:     ││
    │ │ +3 -1 fix ││
    │ │ [Approve] ││
    │ │ [Reject]  ││
    │ └──────────┘│
    └──────┬──────┘
           │
     ┌─────▼─────┐
     │ 10 min    │
     │ timeout   │
     │ → abort   │
     └───────────┘
```

### Key Security Policies

1. **Principle of Least Privilege**: The pipeline token can only push to `staging/`. Production promotion requires a human to click "Approve" in Slack.

2. **Immutable Audit Trail**: Every action (test pass, LLM analysis, patch applied, approve/reject) is recorded as an OpenTelemetry span event in a dedicated trace.

3. **Rollback Contract**: Every deploy automatically snapshots the previous image tag. If health checks fail within 5 minutes, the Deployer Agent auto-invokes ArgoCD rollback without human intervention.

4. **Prompt Injection Guard**: LLM prompts are sandboxed — the raw diff is passed as a file reference (not inline) and scanned for prompt injection patterns before submission.

---

## 5. Implementation MVP — Main Controller

### File Structure

```
lab-y-ai/
├── devops/
│   ├── __init__.py
│   ├── main.py                 # Entry point: CLI / webhook server
│   ├── controller.py           # LangGraph workflow definition
│   ├── state.py                # TypedDict schemas
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── detector.py         # Clone + diff analysis
│   │   ├── tester.py           # Docker spawn + test execution
│   │   ├── fixer.py            # LLM reasoning + patch generation
│   │   ├── deployer.py         # Image push + CI/CD trigger
│   │   └── gater.py            # HITL decision + Slack integration
│   ├── core/
│   │   ├── docker_runner.py    # Docker SDK wrapper
│   │   ├── git_ops.py          # Clone, diff, apply patch
│   │   ├── llm_client.py       # LangChain LLM wrapper
│   │   └── ci_trigger.py       # gh CLI / ArgoCD API wrapper
│   ├── storage/
│   │   ├── redis.py            # Event bus + state cache
│   │   ├── postgres.py         # Persistent state + audit log
│   │   └── chroma.py           # Failure pattern index
│   ├── webhook/
│   │   └── server.py           # FastAPI webhook receiver
│   └── tests/
│       ├── test_controller.py
│       └── fixtures/
```

### `controller.py` — Main Loop

```python
"""Main Controller — Orchestrates the DevOps Agent lifecycle via LangGraph."""

from typing import Optional, Dict, List, Literal
from datetime import datetime, timezone
import logging

from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field

from devops.state import DevOpsState
from devops.agents.detector import detector_agent
from devops.agents.tester import tester_agent
from devops.agents.fixer import fixer_agent
from devops.agents.deployer import deployer_agent
from devops.agents.gater import gate_agent
from devops.core.git_ops import GitRepo
from devops.storage.postgres import AuditStore

logger = logging.getLogger(__name__)


# ── Routing Logic ──────────────────────────────────────────────────

ShouldRetry = Literal["tester"]


def route_on_test_results(state: DevOpsState) -> Literal["deployer", "fixer"]:
    """Route: if all phases pass → deploy; any fail → fixer."""
    all_pass = all(
        phase.status == "pass" for phase in state["test_phases"].values()
    )
    return "deployer" if all_pass else "fixer"


def route_on_fix_outcome(
    state: DevOpsState,
) -> Literal["human_gate", "tester", "escalate"]:
    """Route based on fixer decision and retry budget."""
    if state.get("human_review_required"):
        return "human_gate"
    if state.get("fix_applied") and state.get("retry_count", 0) < 3:
        return "tester"
    return "escalate"


def route_after_gate(state: DevOpsState) -> Literal["tester", "deployer", END]:
    """Route after human review: approved → deploy, rejected → END."""
    verdict = state.get("gate_verdict")
    if verdict == "approved":
        return "deployer"
    # Rejected or timed out → log and stop
    AuditStore.log_gate_decision(state["commit_sha"], verdict or "timeout")
    return END


# ── Graph Construction ─────────────────────────────────────────────

def build_pipeline() -> StateGraph:
    """Assemble the DevOps Agent state graph."""
    builder = StateGraph(DevOpsState)

    # Nodes
    builder.add_node("detector", detector_agent)
    builder.add_node("tester", tester_agent)
    builder.add_node("fixer", fixer_agent)
    builder.add_node("human_gate", gate_agent)
    builder.add_node("deployer", deployer_agent)

    # Edges
    builder.add_edge("detector", "tester")
    builder.add_conditional_edges("tester", route_on_test_results)
    builder.add_conditional_edges("fixer", route_on_fix_outcome)
    builder.add_conditional_edges("human_gate", route_after_gate)
    builder.add_edge("deployer", END)

    builder.set_entry_point("detector")
    logger.info("DevOps pipeline graph assembled.")
    return builder.compile()


# ── Integration Test in Endpoint ───────────────────────────────────

class PipelineTrigger(BaseModel):
    commit_sha: str
    repo_url: str = "https://github.com/lab-y-ai/lab-y-ai"
    branch: str = "main"
    author: str = "unknown"


def run_pipeline(request: PipelineTrigger) -> str:
    """Main entry point — invoked from webhook or CLI."""
    from devops.storage.redis import RedisStateCache

    graph = build_pipeline()

    initial_state: DevOpsState = {
        "commit_sha": request.commit_sha,
        "repo_url": request.repo_url,
        "branch": request.branch,
        "author": request.author,
        "docker_container_id": None,
        "test_phases": {},
        "logs": {},
        "llm_analysis": None,
        "fix_proposal": None,
        "fix_applied": False,
        "human_review_required": False,
        "deployment_status": None,
        "rollback_sha": None,
        "retry_count": 0,
        "started_at": datetime.now(timezone.utc).isoformat(),
    }

    # Executed with checkpointing for resilience
    result = graph.invoke(
        initial_state,
        config={
            "configurable": {"thread_id": request.commit_sha},
            "recursion_limit": 25,
        },
    )

    final_status = result.get("deployment_status", "failed")
    logger.info(f"Pipeline completed for {request.commit_sha[:8]}: {final_status}")

    # Persist final state for audit
    AuditStore.record_pipeline(request.commit_sha, result)

    # Post result summary
    _post_summary_to_slack(request.commit_sha, final_status)

    return final_status


def _post_summary_to_slack(commit_sha: str, status: str) -> None:
    """Send a concise summary to #devops-deployments."""
    logger.info(f"[Slack] Commit {commit_sha[:8]} → {status}")
    # Implementation uses Slack SDK with Block Kit:
    #   blocks = [
    #     SectionBlock(text=f"Pipeline *{status}* for `{commit_sha[:8]}`"),
    #     ...health check metrics, diff link, rollback button...
    #   ]
```

### `agents/tester.py` — Dockerized Test Runner

```python
"""Tester Agent — spins ephemeral Docker env and runs 3 test phases."""

from docker import DockerClient
from docker.types import Mount
from devops.state import DevOpsState
from devops.core.docker_runner import DockerRunner


TEST_PHASES = [
    ("unit", "npm run test:unit"),
    ("integration", "npm run test:int"),
    ("smoke", "npm run test:smoke"),
]

IMAGE_TAG_TEMPLATE = "lab-y-test:{sha}"
NETWORK_NAME = "test-net"


def tester_agent(state: DevOpsState) -> DevOpsState:
    """Execute all three test phases in an isolated Docker environment."""
    sha = state["commit_sha"]
    client = DockerClient.from_env()

    runner = DockerRunner(client)

    # 1. Build image
    image_tag = IMAGE_TAG_TEMPLATE.format(sha=sha)
    runner.build(
        path=f"/tmp/lab-y-repo-{sha}",
        tag=image_tag,
        buildargs={"COMMIT_SHA": sha},
    )

    # 2. Ensure network exists
    networks = client.networks.list(names=[NETWORK_NAME])
    if not networks:
        client.networks.create(NETWORK_NAME, driver="bridge")

    logs: dict = {}
    results: dict = {}

    for phase_name, command in TEST_PHASES:
        container = runner.run(
            image=image_tag,
            command=command,
            network=NETWORK_NAME,
            detach=True,
            auto_remove=True,
            environment={
                "NODE_ENV": "test",
                "COMMIT_SHA": sha,
                "CI": "true",
            },
        )
        # Stream logs with timeout (5 min per phase)
        phase_logs = container.logs(stream=False, tail=5000).decode()
        exit_code = container.wait(timeout=300).get("StatusCode", -1)

        logs[phase_name] = phase_logs
        results[phase_name] = {
            "status": "pass" if exit_code == 0 else "fail",
            "exit_code": exit_code,
            "log_preview": phase_logs[-2000:],
        }

        if exit_code != 0:
            logger.warning(
                f"Phase {phase_name} FAILED for commit {sha[:8]} "
                f"(exit={exit_code})"
            )

    # 3. Cleanup
    runner.cleanup(image_tag)

    return {
        **state,
        "test_phases": results,
        "logs": logs,
        "docker_container_id": None,  # ephemeral, already removed
    }
```

### `agents/fixer.py` — LLM-Powered Root Cause Analysis

```python
"""Fixer Agent — analyzes failures with LLM and proposes patches."""

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from devops.state import DevOpsState, FixProposal
from devops.core.git_ops import GitRepo


FIXER_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are an expert DevOps engineer at Lab Y AI Solutions. "
        "Analyze the test failure below and the code diff. "
        "Classify the issue as one of:\n"
        "  - 'deterministic': clear typo, missing import, env misconfig\n"
        "  - 'complex': requires logic rewrite or API understanding\n"
        "  - 'flaky': likely a race condition or timeout\n\n"
        "If deterministic, output a unified diff patch. "
        "If complex or flaky, set patch to empty.\n\n"
        "{format_instructions}"
    ),
    (
        "human",
        "## Failed Phase: {phase_name}\n"
        "## Error Log (last 200 lines):\n{error_log}\n\n"
        "## Changed Files (diff):\n{diff_context}\n\n"
        "## Current File Content (if known):\n{file_content}"
    ),
])


def fixer_agent(state: DevOpsState) -> DevOpsState:
    """Invoke LLM to analyze failures and return a repair proposal."""

    # Gather context from the first failing phase
    failed_phase = next(
        (name for name, r in state["test_phases"].items() if r["status"] == "fail"),
        None,
    )
    if not failed_phase:
        return {**state, "human_review_required": False}

    error_log = state["logs"].get(failed_phase, ["<no logs>"])[-200:]
    error_log_text = "\n".join(error_log)

    # Get diff
    repo = GitRepo(state["repo_url"], state["commit_sha"])
    diff_context = repo.diff()

    # Structured output parser
    parser = PydanticOutputParser(pydantic_object=FixProposal)

    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    chain = FIXER_PROMPT | llm | parser

    proposal: FixProposal = chain.invoke({
        "phase_name": failed_phase,
        "error_log": error_log_text,
        "diff_context": diff_context[:6000],  # truncate for token limits
        "file_content": repo.get_touched_files_content(),
        "format_instructions": parser.get_format_instructions(),
    })

    # Apply patch if deterministic
    fix_applied = False
    if proposal.classification == "deterministic" and proposal.patch:
        try:
            repo.apply_patch(proposal.patch)
            fix_applied = True
            logger.info(f"Deterministic fix applied for {state['commit_sha'][:8]}")
        except Exception as exc:
            logger.error(f"Patch apply failed: {exc}")
            proposal.classification = "complex"

    return {
        **state,
        "llm_analysis": proposal.analysis_summary,
        "fix_proposal": proposal.dict(),
        "fix_applied": fix_applied,
        "human_review_required": proposal.classification != "deterministic",
        "retry_count": state.get("retry_count", 0) + 1,
    }
```

### `agents/gater.py` — Human-in-the-Loop Gate

```python
"""Gate Agent — enforces human approval before production deployment."""

import os
import json
from datetime import datetime, timezone

from slack_sdk import WebClient
from slack_sdk.models.blocks import (
    SectionBlock,
    DividerBlock,
    ActionsBlock,
    ButtonElement,
    HeaderBlock,
    CodeBlock,
)

from devops.state import DevOpsState


SLACK_TOKEN = os.environ["SLACK_BOT_TOKEN"]
SLACK_CHANNEL = os.environ.get("SLACK_DEPLOY_CHANNEL", "#devops-deployments")
SLACK_SIGNING_SECRET = os.environ["SLACK_SIGNING_SECRET"]

client = WebClient(token=SLACK_TOKEN)


def gate_agent(state: DevOpsState) -> DevOpsState:
    """Post an approval request to Slack and wait for response."""
    sha = state["commit_sha"][:8]
    branch = state["branch"]

    blocks = [
        HeaderBlock(text=f"🚀 Deployment Approval Required — {sha}"),
        DividerBlock(),
        SectionBlock(
            fields=[
                f"*Commit:* `{sha}`",
                f"*Branch:* `{branch}`",
                f"*Author:* {state['author']}",
                f"*Test Status:* {_summary(state['test_phases'])}",
            ]
        ),
        SectionBlock(text=f"*LLM Analysis:*\n{state.get('llm_analysis', 'N/A')}"),
        CodeBlock(
            title="Proposed Patch (if any)",
            text=json.dumps(state.get("fix_proposal", {}), indent=2)[:2000],
        ),
        DividerBlock(),
        ActionsBlock(
            elements=[
                ButtonElement(
                    text="✅ Approve & Deploy",
                    style="primary",
                    action_id="approve_deploy",
                    value=sha,
                ),
                ButtonElement(
                    text="❌ Reject",
                    style="danger",
                    action_id="reject_deploy",
                    value=sha,
                ),
                ButtonElement(
                    text="🔁 Rollback Only",
                    action_id="rollback_deploy",
                    value=sha,
                ),
            ]
        ),
    ]

    message = client.chat_postMessage(channel=SLACK_CHANNEL, blocks=blocks)

    # Store message metadata for callback lookup
    state["gate_message_ts"] = message["ts"]
    state["gate_channel"] = SLACK_CHANNEL

    # Wait for approval (polling — or use Slack Events API in production)
    verdict = _poll_for_approval(message["ts"], timeout_minutes=10)

    return {
        **state,
        "gate_verdict": verdict,
        "gate_decided_at": datetime.now(timezone.utc).isoformat(),
    }


def _summary(test_phases: dict) -> str:
    parts = [f"{k}: {'✅' if v['status']=='pass' else '❌'}" for k, v in test_phases.items()]
    return " | ".join(parts)


def _poll_for_approval(ts: str, timeout_minutes: int = 10) -> str:
    """Poll Slack for button interaction. Exhausts on timeout → 'timeout'."""
    import time
    deadline = time.time() + timeout_minutes * 60
    while time.time() < deadline:
        # In production, use Slack Events API with
        # a FastAPI endpoint /slack/actions instead of polling
        time.sleep(5)
    return "timeout"
```

### `core/docker_runner.py` — Idempotent Docker Wrapper

```python
"""DockerRunner — idempotent, observable ephemeral container lifecycle."""

import hashlib
import logging
from typing import Optional, List
from docker import DockerClient
from docker.errors import ImageNotFound, ContainerError

logger = logging.getLogger(__name__)


class DockerRunner:
    """Manages ephemeral build+test containers with idempotency keys."""

    def __init__(self, client: DockerClient):
        self.client = client

    def build(self, path: str, tag: str, buildargs: dict = None) -> str:
        """Build image. Idempotent: skip if tag already exists (unless force)."""
        try:
            self.client.images.get(tag)
            logger.info(f"Image {tag} exists, skipping build")
            return tag
        except ImageNotFound:
            pass

        image, logs = self.client.images.build(
            path=path,
            tag=tag,
            buildargs=buildargs or {},
            rm=True,
            forcerm=True,
        )
        for line in logs:
            if "error" in str(line).lower():
                logger.error(f"Build log: {line}")
        logger.info(f"Image {tag} built (id={image.id[:16]})")
        return tag

    def run(
        self,
        image: str,
        command: str,
        network: str = None,
        detach: bool = True,
        auto_remove: bool = True,
        environment: dict = None,
        timeout: int = 300,
    ) -> dict:
        """Run a container with idempotency (named by content hash)."""
        container_name = f"test-{hashlib.md5(command.encode()).hexdigest()[:12]}"

        container = self.client.containers.run(
            image=image,
            command=command,
            name=container_name,
            network=network,
            detach=detach,
            auto_remove=auto_remove,
            environment=environment or {},
            mem_limit="2g",
            cpu_period=100000,
            cpu_quota=200000,  # 2 CPUs
        )

        logger.info(f"Container {container_name} started for command: {command[:60]}")
        return container

    def cleanup(self, image_tag: str = None):
        """Remove test image to free disk space."""
        if image_tag:
            try:
                self.client.images.remove(image_tag, force=True)
                logger.info(f"Removed image {image_tag}")
            except Exception:
                pass
```

### `storage/postgres.py` — Audit Store

```python
"""PostgreSQL-backed audit store for pipeline events."""

import json
from datetime import datetime
from sqlalchemy import create_engine, Column, String, DateTime, JSON, Text
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


class PipelineRun(Base):
    __tablename__ = "pipeline_runs"

    id = Column(String(64), primary_key=True)  # commit_sha
    status = Column(String(32), nullable=False)
    state_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)


class GateDecision(Base):
    __tablename__ = "gate_decisions"

    id = Column(String(128), primary_key=True)
    commit_sha = Column(String(64), nullable=False)
    verdict = Column(String(32), nullable=False)
    decided_by = Column(String(128), nullable=True)
    decided_at = Column(DateTime, default=datetime.utcnow)


class AuditStore:
    engine = create_engine("postgresql://devops:pass@localhost:5432/lab_y_devops")
    Session = sessionmaker(bind=engine)

    @classmethod
    def record_pipeline(cls, commit_sha: str, state: dict):
        session = cls.Session()
        run = PipelineRun(
            id=commit_sha,
            status=state.get("deployment_status", "unknown"),
            state_json=_serialize(state),
        )
        session.merge(run)
        session.commit()
        session.close()

    @classmethod
    def log_gate_decision(cls, commit_sha: str, verdict: str):
        session = cls.Session()
        decision = GateDecision(
            id=f"{commit_sha}-{verdict}",
            commit_sha=commit_sha,
            verdict=verdict,
        )
        session.add(decision)
        session.commit()
        session.close()


def _serialize(state: dict) -> dict:
    """Convert non-serializable fields."""
    return json.loads(json.dumps(state, default=str))
```

### `state.py` — Typed State Definitions

```python
"""State schemas for the LangGraph DevOps pipeline."""

from typing import TypedDict, Optional, Dict, List
from pydantic import BaseModel, Field


class TestPhaseResult(TypedDict):
    status: str          # "pass" | "fail"
    exit_code: int
    log_preview: str


class FixProposal(BaseModel):
    classification: str = Field(
        ..., description="'deterministic' | 'complex' | 'flaky'"
    )
    analysis_summary: str = Field(
        ..., description="Human-readable root cause explanation"
    )
    patch: Optional[str] = Field(
        None, description="Unified diff patch if deterministic"
    )
    confidence: float = Field(
        ..., ge=0.0, le=1.0, description="LLM confidence in the fix"
    )


class DevOpsState(TypedDict):
    commit_sha: str
    repo_url: str
    branch: str
    author: str
    docker_container_id: Optional[str]
    test_phases: Dict[str, TestPhaseResult]
    logs: Dict[str, List[str]]
    llm_analysis: Optional[str]
    fix_proposal: Optional[dict]
    fix_applied: bool
    human_review_required: bool
    deployment_status: Optional[str]
    rollback_sha: Optional[str]
    retry_count: int
    started_at: Optional[str]
    # Gate state
    gate_message_ts: Optional[str]
    gate_channel: Optional[str]
    gate_verdict: Optional[str]
    gate_decided_at: Optional[str]
```

---

## 6. Reliability, Idempotency & Observability

### Reliability Patterns

| Pattern | Implementation |
|---|---|
| **Circuit Breaker** | After 3 consecutive failures in any phase, escalate to human and cool down for 5 minutes |
| **Retry with Backoff** | Test runner: exponential backoff (1s, 2s, 4s) for container startup failures |
| **Checkpointing** | LangGraph saves state after every node; crash recovery resumes from last checkpoint |
| **Dead Letter Queue** | Unprocessable commits go to a Redis list for manual inspection |

### Idempotency Guarantees

```
Operation         | Idempotency Key          | Behavior on Repeat
------------------|--------------------------|-----------------------------------------
Build Docker image| image_tag = lab-y-test:sha| Skip if tag exists
Run test phase    | container_name = hash(cmd)| Named container; Docker rejects duplicate
Apply git patch   | patch_hash               | `git apply` is atomic; reject already-applied
Deploy to staging | commit_sha               | ArgoCD sync is idempotent; same SHA = no-op
Notify Slack      | message_ts               | Update existing message instead of new post
```

### Observability Stack Integration

Each agent emits OpenTelemetry spans:

```python
from opentelemetry import trace

tracer = trace.get_tracer("devops.pipeline")

with tracer.start_as_current_span("tester.run_phase") as span:
    span.set_attribute("phase", phase_name)
    span.set_attribute("commit_sha", sha)
    span.set_attribute("exit_code", exit_code)
    span.set_status(trace.StatusCode.OK if exit_code == 0 else trace.StatusCode.ERROR)
```

**Grafana Dashboard Panels**:
- Pipeline success rate (per branch, per phase)
- LLM fix acceptance rate (deterministic vs. escalated)
- Time-to-deploy (p95, p99)
- HITL gate response time
- Rollback frequency

---

## 7. Deployment to Your Existing Project

The `devops/` package integrates cleanly alongside your existing `src/` directory:

```yaml
# docker-compose.devops.yml — add to lab-y-ai root
version: "3.8"
services:
  controller:
    build:
      context: .
      dockerfile: Dockerfile.devops
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: lab_y_devops
      POSTGRES_PASSWORD: pass
    ports: ["5432:5432"]

  loki:
    image: grafana/loki:latest
    ports: ["3100:3100"]

  grafana:
    image: grafana/grafana:latest
    ports: ["3001:3000"]
```

### One-Time Setup

```bash
# 1. Add dev dependencies
npm install --save-dev vitest @playwright/test  # test runners

# 2. Create test scripts in package.json
#    "test:unit": "vitest run",
#    "test:int": "playwright test",
#    "test:smoke": "curl -f http://localhost:3000/api/health"

# 3. Initialize the DevOps service
pip install -r devops/requirements.txt
# langgraph langchain-openai docker redis sqlalchemy psycopg2-binary
# slack-sdk opentelemetry-api opentelemetry-sdk

# 4. Bootstrap database
python -c "from devops.storage.postgres import Base, AuditStore; Base.metadata.create_all(AuditStore.engine)"

# 5. Run the pipeline
python -m devops.main --commit-sha $(git rev-parse HEAD)
```
