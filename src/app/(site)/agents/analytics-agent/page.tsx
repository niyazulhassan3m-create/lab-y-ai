"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Range = "7d" | "30d" | "90d";
type Message = { role: "user" | "ai"; text: string };

const dataSets: Record<Range, {
  metrics: { label: string; value: string; change: string; img: string }[];
  chart: number[];
  intents: { label: string; pct: number; color: string }[];
  calls: { name: string; intent: string; score: number; duration: string; sentiment: string }[];
}> = {
  "7d": {
    metrics: [
      { label: "Total Calls", value: "312", change: "+12%", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=120&q=80&auto=format&fit=crop" },
      { label: "Avg Duration", value: "4:12", change: "-5%", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80&auto=format&fit=crop" },
      { label: "Conversion", value: "24.1%", change: "+6.2%", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80&auto=format&fit=crop" },
      { label: "Sentiment", value: "8.9/10", change: "+0.4", img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&q=80&auto=format&fit=crop" },
    ],
    chart: [40, 65, 45, 80, 55, 90, 70],
    intents: [
      { label: "Product Inquiry", pct: 38, color: "bg-accent-500" },
      { label: "Pricing", pct: 25, color: "bg-blue-500" },
      { label: "Support", pct: 20, color: "bg-green-500" },
      { label: "Demo Booking", pct: 12, color: "bg-yellow-500" },
      { label: "Other", pct: 5, color: "bg-grey-500" },
    ],
    calls: [
      { name: "+91 98765 43210", intent: "Product Inquiry", score: 87, duration: "5:12", sentiment: "positive" },
      { name: "+91 87654 32109", intent: "Pricing Question", score: 92, duration: "3:45", sentiment: "positive" },
      { name: "+1 555 0123", intent: "Support Request", score: 65, duration: "8:20", sentiment: "neutral" },
      { name: "+91 76543 21098", intent: "Demo Booking", score: 95, duration: "6:30", sentiment: "positive" },
      { name: "+65 9123 4567", intent: "Partnership", score: 78, duration: "4:15", sentiment: "neutral" },
    ],
  },
  "30d": {
    metrics: [
      { label: "Total Calls", value: "1,247", change: "+12%", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=120&q=80&auto=format&fit=crop" },
      { label: "Avg Duration", value: "4:32", change: "-8%", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80&auto=format&fit=crop" },
      { label: "Conversion", value: "23.4%", change: "+5.2%", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80&auto=format&fit=crop" },
      { label: "Sentiment", value: "8.7/10", change: "+0.3", img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&q=80&auto=format&fit=crop" },
    ],
    chart: [35, 58, 42, 72, 50, 85, 68, 45, 62, 78, 55, 90, 48, 70, 60, 82, 52, 75, 40, 65, 88, 56, 79, 62, 84, 50, 73, 46, 69, 80],
    intents: [
      { label: "Product Inquiry", pct: 38, color: "bg-accent-500" },
      { label: "Pricing", pct: 25, color: "bg-blue-500" },
      { label: "Support", pct: 20, color: "bg-green-500" },
      { label: "Demo Booking", pct: 12, color: "bg-yellow-500" },
      { label: "Other", pct: 5, color: "bg-grey-500" },
    ],
    calls: [
      { name: "+91 98765 43210", intent: "Product Inquiry", score: 87, duration: "5:12", sentiment: "positive" },
      { name: "+91 87654 32109", intent: "Pricing Question", score: 92, duration: "3:45", sentiment: "positive" },
      { name: "+1 555 0123", intent: "Support Request", score: 65, duration: "8:20", sentiment: "neutral" },
      { name: "+91 76543 21098", intent: "Demo Booking", score: 95, duration: "6:30", sentiment: "positive" },
      { name: "+65 9123 4567", intent: "Partnership", score: 78, duration: "4:15", sentiment: "neutral" },
      { name: "+91 99887 66550", intent: "Tech Support", score: 71, duration: "7:05", sentiment: "neutral" },
      { name: "+91 88776 55440", intent: "Product Inquiry", score: 88, duration: "4:50", sentiment: "positive" },
    ],
  },
  "90d": {
    metrics: [
      { label: "Total Calls", value: "3,891", change: "+18%", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=120&q=80&auto=format&fit=crop" },
      { label: "Avg Duration", value: "4:48", change: "-11%", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80&auto=format&fit=crop" },
      { label: "Conversion", value: "22.8%", change: "+7.5%", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80&auto=format&fit=crop" },
      { label: "Sentiment", value: "8.5/10", change: "+0.6", img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=120&q=80&auto=format&fit=crop" },
    ],
    chart: [30, 48, 35, 62, 42, 75, 55, 40, 58, 68, 45, 78, 52, 60, 50, 72, 44, 65, 38, 55, 80, 48, 70, 52, 74, 42, 63, 38, 59, 72, 45, 68, 50, 78, 55, 70, 42, 62, 48, 72, 58, 80, 52, 65, 40, 60, 75, 50, 68, 56, 78, 45, 72, 55, 82, 48, 66, 42, 70, 58, 76, 52, 64, 38, 60, 72, 48, 68, 44, 74, 50, 62, 78, 55, 70, 42, 58, 80, 48, 72, 60, 76, 52, 68, 45, 65, 50, 78, 55, 72],
    intents: [
      { label: "Product Inquiry", pct: 35, color: "bg-accent-500" },
      { label: "Pricing", pct: 28, color: "bg-blue-500" },
      { label: "Support", pct: 22, color: "bg-green-500" },
      { label: "Demo Booking", pct: 10, color: "bg-yellow-500" },
      { label: "Other", pct: 5, color: "bg-grey-500" },
    ],
    calls: [
      { name: "+91 98765 43210", intent: "Product Inquiry", score: 87, duration: "5:12", sentiment: "positive" },
      { name: "+91 87654 32109", intent: "Pricing Question", score: 92, duration: "3:45", sentiment: "positive" },
      { name: "+1 555 0123", intent: "Support Request", score: 65, duration: "8:20", sentiment: "neutral" },
      { name: "+91 76543 21098", intent: "Demo Booking", score: 95, duration: "6:30", sentiment: "positive" },
      { name: "+65 9123 4567", intent: "Partnership", score: 78, duration: "4:15", sentiment: "neutral" },
      { name: "+91 99887 66550", intent: "Tech Support", score: 71, duration: "7:05", sentiment: "neutral" },
      { name: "+91 88776 55440", intent: "Product Inquiry", score: 88, duration: "4:50", sentiment: "positive" },
      { name: "+44 7700 123456", intent: "Pricing Question", score: 83, duration: "6:10", sentiment: "positive" },
      { name: "+91 77665 44330", intent: "Support Request", score: 59, duration: "9:30", sentiment: "negative" },
    ],
  },
};

const suggestions = [
  "Call trends sollu",
  "Which intent is highest?",
  "Sentiment improve panna suggestion?",
  "Conversion rate enna?",
];

function analyticsFallback(msg: string): string {
  const q = msg.toLowerCase();
  if (q.includes("trend") || q.includes("volume") || q.includes("call")) return "Overall call trend positive — last month +12% increase. Saturday peak day (90 calls). Busiest hours 10AM-12PM and 3PM-5PM. Peak hours la staffing increase panna recommend pannren.";
  if (q.includes("intent") || q.includes("purpose") || q.includes("type") || q.includes("category")) return "Top intents: Product Inquiry 38%, Pricing 25%, Support 20%, Demo Booking 12%, Other 5%. Product inquiry growing trend la irukku — marketing invest continue pannalam.";
  if (q.includes("sentiment") || q.includes("feeling") || q.includes("happy") || q.includes("satisfaction")) return "Overall sentiment score 8.7/10 — positive! +0.3 improvement. Support calls la sentiment slightly lower (7.2/10). Support team training recommend pannren.";
  if (q.includes("conversion") || q.includes("convert") || q.includes("sale") || q.includes("lead")) return "Conversion rate 23.4%, +5.2% improvement. Demo booking leads highest conversion at 67%. Pricing intent conversions improving!";
  if (q.includes("duration") || q.includes("time") || q.includes("long") || q.includes("length")) return "Average call duration 4:32, -8% from last month. Good sign — agents resolving faster. Support calls avg 7:30, pricing calls avg 3:15.";
  if (q.includes("region") || q.includes("location") || q.includes("place") || q.includes("country")) return "India 62%, International 38%. Top: US (15%), UAE (8%), Singapore (6%), UK (5%), Malaysia (4%). International expansion potential strong!";
  if (q.includes("recommend") || q.includes("suggest") || q.includes("improve") || q.includes("optimize")) return "Key recommendations: 1) Peak hour staffing increase, 2) Support team sentiment training, 3) Pricing page A/B test continue, 4) International expansion, 5) Demo booking funnel optimization.";
  if (q.includes("hi") || q.includes("hello") || q.includes("vanakkam")) return "Vanakkam! Naan Analytics Agent. Unga call data analysis related yaavadhu ketunga — trends, sentiment, intents ellam explain pannren!";
  return "Analytics data: Total calls 1,247, Avg duration 4:32, Sentiment 8.7/10, Conversion 23.4%. Entha metric pathi specifically ketunga!";
}

const dayLabels: Record<string, string[]> = {
  "7d": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  "30d": [],
  "90d": [],
};

export default function AnalyticsAgentPage() {
  const [range, setRange] = useState<Range>("7d");
  const data = dataSets[range];
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Vanakkam! Naan Analytics Agent pesuren. Unga call data analysis related yaavadhu ketunga — trends, sentiment, intents ellam explain pannren!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch("/api/analytics-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const json = await res.json();
      const reply = json.response || json.error || analyticsFallback(text);
      setMessages((prev) => [...prev, { role: "ai", text: reply.startsWith("⚠️") ? analyticsFallback(text) : reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: analyticsFallback(text) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl font-bold mb-3">Analytics Agent</h1>
          <p className="text-grey-400">Call analytics, sentiment tracking, and AI-powered insights.</p>
        </div>

        {/* Date Range Filter */}
        <div className="flex justify-center gap-2 mb-6">
          {(["7d", "30d", "90d"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => { setRange(r); setActiveBar(null); }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all ${
                range === r
                  ? "bg-accent-600 text-white"
                  : "bg-white/5 text-grey-400 hover:bg-white/10"
              }`}
            >
              {r === "7d" ? "Last 7 Days" : r === "30d" ? "Last 30 Days" : "Last 90 Days"}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {data.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/5 bg-card p-4 transition-all hover:border-accent-500/30">
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
            <p className="text-sm font-semibold mb-4">Call Volume</p>
            <div className="flex items-end gap-1.5 h-32">
              {data.chart.slice(0, range === "7d" ? 7 : range === "30d" ? 14 : 21).map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setActiveBar(i)}
                  onMouseLeave={() => setActiveBar(null)}
                >
                  {activeBar === i && <span className="text-[9px] text-accent-300">{h}</span>}
                  <div
                    className={`w-full rounded-md transition-all ${
                      activeBar === i ? "bg-accent-500/80" : "bg-accent-600/40 hover:bg-accent-600/60"
                    }`}
                    style={{ height: `${Math.max(h * 1.0, 4)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Intent Distribution */}
          <div className="rounded-xl border border-white/5 bg-card p-6">
            <p className="text-sm font-semibold mb-4">Call Intent Distribution</p>
            {data.intents.map((item) => (
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
        <div className="rounded-xl border border-white/5 bg-card p-6 mb-6">
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
                {data.calls.map((call, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4 text-grey-300">{call.name}</td>
                    <td className="py-3 pr-4 text-grey-300">{call.intent}</td>
                    <td className="py-3 pr-4 text-right"><span className={`font-semibold ${call.score >= 80 ? "text-green-400" : call.score >= 60 ? "text-yellow-400" : "text-red-400"}`}>{call.score}</span></td>
                    <td className="py-3 pr-4 text-right text-grey-300">{call.duration}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        call.sentiment === "positive" ? "bg-green-500/10 text-green-400" :
                        call.sentiment === "negative" ? "bg-red-500/10 text-red-400" :
                        "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {call.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Analytics Chat */}
        <div className="rounded-xl border border-white/5 bg-card p-6">
          <p className="text-sm font-semibold mb-1">
            AI Analytics Chat
            <span className="text-[10px] text-grey-500 ml-2 font-normal">Ask anything about your data</span>
          </p>
          <div className="h-48 overflow-y-auto mb-3 space-y-2 px-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent-600 text-white"
                    : "bg-white/5 text-grey-300"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-xl px-3 py-2 text-xs text-grey-500">
                  <span className="animate-pulse">Analysing data...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-grey-400 hover:bg-accent-600/20 hover:text-accent-300 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type in English or Tanglish..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-grey-600 outline-none focus:border-accent-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-accent-600 text-white text-xs font-medium hover:bg-accent-500 transition-all disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/text-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Text Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/media-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Media Agent →</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/website-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Website Developing →</Link>
        </div>
      </div>
    </section>
  );
}
