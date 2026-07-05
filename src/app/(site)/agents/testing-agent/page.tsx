import Link from "next/link";

export default function TestingAgentPage() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Testing Agent</h1>
          <p className="text-grey-400 text-lg max-w-2xl mx-auto">
            AI-powered QA automation — generate, execute, and report tests at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[
            { img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&q=80&auto=format&fit=crop", title: "Test Generation", desc: "AI analyzes your app and generates comprehensive test cases automatically.", color: "from-blue-900/20" },
            { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&q=80&auto=format&fit=crop", title: "Auto Execution", desc: "Run tests across browsers, APIs, and mobile devices in parallel.", color: "from-green-900/20" },
            { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&q=80&auto=format&fit=crop", title: "Visual Regression", desc: "Detect UI changes and visual bugs with AI-powered screenshot comparison.", color: "from-yellow-900/20" },
            { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&q=80&auto=format&fit=crop", title: "Bug Reporting", desc: "Auto-generated bug reports with screenshots, logs, and stack traces.", color: "from-red-900/20" },
          ].map((f) => (
            <div key={f.title} className={`rounded-xl border border-white/5 bg-gradient-to-br ${f.color} to-card p-6`}>
              <img src={f.img} alt={f.title} className="w-10 h-10 rounded-lg object-cover mb-3" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-grey-400">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/5 bg-card p-8">
          <h2 className="text-xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: "01", label: "Connect", desc: "Link your GitHub, GitLab, or app URL" },
              { n: "02", label: "Analyze", desc: "AI scans your app structure & flows" },
              { n: "03", label: "Generate", desc: "Tests auto-created with edge cases" },
              { n: "04", label: "Report", desc: "Results with bug reports & fixes" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <span className="text-2xl font-bold text-accent-400">{s.n}</span>
                <h4 className="text-sm font-semibold mt-1 mb-1">{s.label}</h4>
                <p className="text-[11px] text-grey-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/voice-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Voice Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/analytics-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Analytics Agent →</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/website-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Website Developing →</Link>
        </div>
      </div>
    </section>
  );
}
