import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an Analytics AI Agent for Lab Y AI Solutions. You answer questions about call analytics and provide data-driven insights.

CRITICAL RULES:
- Respond in Tanglish (Tamil + English mix written in Roman script)
- Keep responses SHORT (2-4 sentences)
- Be professional and data-focused
- Never say you're an AI or language model

ABOUT LAB Y:
- 5 AI Agents: Text Agent, Voice Agent, Testing Agent, Analytics Agent, Media Agent
- Voice agent handles inbound + outbound calls via Vapi
- 14-day free trial on all plans

CURRENT DATA (example):
Total calls: 1,247 | Avg duration: 4:32 | Conversion: 23.4% | Sentiment: 8.7/10
Top intents: Product Inquiry 38%, Pricing 25%, Support 20%, Demo Booking 12%, Other 5%
Daily avg: ~178 calls | Peak day: Saturday | Busiest: 10AM-12PM, 3PM-5PM
Trend: +12% call volume vs last month | Conversion improving +5.2%
Top region: India (62%) | International (38%)

Provide actionable recommendations based on patterns in the data.`;

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function fallbackReply(msg: string): string {
  const q = msg.toLowerCase();
  if (q.includes("trend") || q.includes("volume") || q.includes("call")) return "Overall call trend positive — last month +12% increase. Saturday peak day (90 calls). Busiest hours 10AM-12PM and 3PM-5PM. Sales team strength adjust panna recommend pannren peak hours la.";
  if (q.includes("intent") || q.includes("purpose") || q.includes("type") || q.includes("category")) return "Top intents: Product Inquiry 38%, Pricing 25%, Support 20%, Demo Booking 12%, Other 5%. Product inquiry growing trend la irukku — marketing invest continue pannalam.";
  if (q.includes("sentiment") || q.includes("feeling") || q.includes("happy") || q.includes("satisfaction")) return "Overall sentiment score 8.7/10 — positive! +0.3 improvement from last month. Support calls la sentiment slightly lower (7.2/10). Support team training recommend pannren.";
  if (q.includes("conversion") || q.includes("convert") || q.includes("sale") || q.includes("lead")) return "Conversion rate 23.4%, +5.2% improvement. Demo booking leads highest conversion at 67%. Pricing intent conversions improving — recent pricing page updates working well!";
  if (q.includes("duration") || q.includes("time") || q.includes("long") || q.includes("length")) return "Average call duration 4:32, -8% from last month. Good sign — agents resolving queries faster. Support calls avg 7:30 (longest), pricing calls avg 3:15 (shortest).";
  if (q.includes("region") || q.includes("location") || q.includes("place") || q.includes("area") || q.includes("country")) return "India 62%, International 38%. Top international markets: US (15%), UAE (8%), Singapore (6%), UK (5%), Malaysia (4%). International expansion potential strong!";
  if (q.includes("recommend") || q.includes("suggest") || q.includes("improve") || q.includes("optimize")) return "Key recommendations: 1) Peak hour staffing increase (10AM-12PM), 2) Support team sentiment training, 3) Pricing page A/B test continue, 4) International markets expansion, 5) Demo booking funnel optimization.";
  return "Analytics data according to current period: Total calls 1,247, Avg duration 4:32, Sentiment 8.7/10, Conversion 23.4%. Entha metric pathi specifically ketunga — detailed insight tharen!";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      const rand = Math.floor(Math.random() * daysOfWeek.length);
      return NextResponse.json({ status: "ok", response: `Overall call trend positive — last month +12% increase. ${daysOfWeek[rand]} peak day with high volume. Busiest hours 10AM-12PM and 3PM-5PM. Entha metric pathi specifically ketunga, detailed insight tharen!` });
    }

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am the Analytics Agent for Lab Y AI Solutions. I will provide data-driven insights in Tanglish." }] },
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ status: "ok", response: fallbackReply(message) });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return NextResponse.json({ status: "ok", response: text || fallbackReply(message) });
  } catch {
    return NextResponse.json({ status: "ok", response: "Konjam technical issue! Wait panni re-type pannunga." });
  }
}
