"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const GEMINI_OK = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function TextAgentPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>(
    GEMINI_OK ? [] : [{ role: "ai", text: "Hi! I'm Yara, Lab Y's text agent. Ask me anything about our products!" }]
  );
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    if (!GEMINI_OK) {
      setTimeout(() => {
        let reply = "That's a great question! I'd recommend checking our Services page or booking a demo.";
        const q = text.toLowerCase();
        if (q.includes("service") || q.includes("product")) reply = "We offer Enterprise SaaS, Micro SaaS, AI Voice Agents, and AI-Integrated CRMs. Which interests you?";
        else if (q.includes("pric")) reply = "Starter $2,499/mo, Growth $6,999/mo, Enterprise custom. 14-day free trial!";
        else if (q.includes("demo")) reply = "Sure! Visit our Contact page to schedule a demo.";
        else if (q.includes("voice")) reply = "Our AI Voice Agents handle calls with natural conversation, sentiment analysis, and live handoff.";
        setMessages((prev) => [...prev, { role: "ai", text: reply }]);
      }, 800);
      return;
    }
    setThinking(true);
    try {
      const res = await fetch("/api/voice-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: [] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response || "Sorry, enakku puriyala." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Oops! Something went wrong." }]);
    } finally { setThinking(false); }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl font-bold mb-3">Text Agent</h1>
          <p className="text-grey-400">Conversational AI chatbot — type and get instant answers.</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-card/80 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-white/5">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <ellipse cx="18" cy="14" rx="13" ry="12" fill="#3D0D14" />
              <ellipse cx="7" cy="15" rx="5" ry="10" fill="#3D0D14" />
              <ellipse cx="29" cy="15" rx="5" ry="10" fill="#3D0D14" />
              <ellipse cx="18" cy="17" rx="11" ry="10" fill="#fce4d6" />
              <ellipse cx="14" cy="16" rx="1.8" ry="2" fill="#2d1218" />
              <ellipse cx="22" cy="16" rx="1.8" ry="2" fill="#2d1218" />
              <path d="M15 20 Q18 22.5 21 20" fill="none" stroke="#9B2D3E" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-sm font-semibold">Yara — Text Agent</p>
              <p className="text-[10px] text-green-400 font-medium">{GEMINI_OK ? "Gemini AI" : "Rule-based"}</p>
            </div>
          </div>
          <div className="h-[350px] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-accent-600/20 border border-accent-600/20 text-white rounded-br-md" : "bg-white/5 border border-white/5 text-grey-200 rounded-bl-md"}`}>{m.text}</div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl px-4 py-3"><div className="flex gap-1">
                  {[0, 150, 300].map((d) => <span key={d} className="w-2 h-2 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                </div></div>
              </div>
            )}
            <div ref={chatEnd} />
          </div>
          <div className="border-t border-white/5 p-4">
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type in Tanglish or English..." className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30" />
              <button onClick={send} disabled={!input.trim()} className="px-5 py-3 rounded-xl bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/voice-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Voice Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/analytics-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Analytics Agent →</Link>
        </div>
      </div>
    </section>
  );
}
