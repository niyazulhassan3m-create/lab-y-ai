import Link from "next/link";

const metrics = [
  { label: "Total Calls", value: "1,247", change: "+12%", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=120&q=80&auto=format&fit=crop" },
  { label: "Avg Duration", value: "4:32", change: "-8%", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80&auto=format&fit=crop" },
  { label: "Conversion", value: "23.4%", change: "+5.2%", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80&auto=format&fit=crop" },
  { label: "Sentiment", value: "8.7/10", change: "+0.3", img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&q=80&auto=format&fit=crop" },
];

const recentCalls = [
  { name: "+91 98765 43210", intent: "Product Inquiry", score: 87, duration: "5:12", sentiment: "positive" },
  { name: "+91 87654 32109", intent: "Pricing Question", score: 92, duration: "3:45", sentiment: "positive" },
  { name: "+1 555 0123", intent: "Support Request", score: 65, duration: "8:20", sentiment: "neutral" },
  { name: "+91 76543 21098", intent: "Demo Booking", score: 95, duration: "6:30", sentiment: "positive" },
  { name: "+65 9123 4567", intent: "Partnership", score: 78, duration: "4:15", sentiment: "neutral" },
];

export default function AnalyticsAgentPage() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl font-bold mb-3">Analytics Agent</h1>
          <p className="text-grey-400">Call analytics, sentiment tracking, and performance insights.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/5 bg-card p-4">
              <img src={m.img} alt={m.label} className="w-8 h-8 rounded object-cover mb-1" />
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-[11px] text-grey-500">{m.label}</p>
              <span className={`text-[10px] font-medium ${m.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{m.change} vs last month</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Call Volume Chart */}
          <div className="rounded-xl border border-white/5 bg-card p-6">
            <p className="text-sm font-semibold mb-4">Call Volume (Last 7 Days)</p>
            <div className="flex items-end gap-2 h-32">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-grey-500">{h}</span>
                  <div className="w-full rounded-md bg-accent-600/40 hover:bg-accent-600/60 transition-all" style={{ height: `${h * 1.2}px` }} />
                  <span className="text-[9px] text-grey-600">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Intent Distribution */}
          <div className="rounded-xl border border-white/5 bg-card p-6">
            <p className="text-sm font-semibold mb-4">Call Intent Distribution</p>
            {[
              { label: "Product Inquiry", pct: 38, color: "bg-accent-500" },
              { label: "Pricing", pct: 25, color: "bg-blue-500" },
              { label: "Support", pct: 20, color: "bg-green-500" },
              { label: "Demo Booking", pct: 12, color: "bg-yellow-500" },
              { label: "Other", pct: 5, color: "bg-grey-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 mb-2">
                <span className="text-[11px] text-grey-400 w-24">{item.label}</span>
                <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} opacity-80`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-[11px] text-grey-400 w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Calls Table */}
        <div className="rounded-xl border border-white/5 bg-card p-6">
          <p className="text-sm font-semibold mb-4">Recent Call Analytics</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-grey-500 border-b border-white/5">
                  <th className="text-left py-2 pr-4">Phone</th>
                  <th className="text-left py-2 pr-4">Intent</th>
                  <th className="text-right py-2 pr-4">Score</th>
                  <th className="text-right py-2 pr-4">Duration</th>
                  <th className="text-right py-2">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4 text-grey-300">{call.name}</td>
                    <td className="py-3 pr-4 text-grey-300">{call.intent}</td>
                    <td className="py-3 pr-4 text-right"><span className={`font-semibold ${call.score >= 80 ? "text-green-400" : call.score >= 60 ? "text-yellow-400" : "text-red-400"}`}>{call.score}</span></td>
                    <td className="py-3 pr-4 text-right text-grey-300">{call.duration}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${call.sentiment === "positive" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {call.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/text-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Text Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/media-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Media Agent →</Link>
        </div>
      </div>
    </section>
  );
}
