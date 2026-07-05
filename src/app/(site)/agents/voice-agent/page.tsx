"use client";

import VoiceAgent from "@/components/VoiceAgent";
import Link from "next/link";

export default function VoiceAgentPage() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 mb-2 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Voice Agent</h1>
          <p className="text-grey-400 text-lg max-w-xl mx-auto">
            Real phone calls or browser voice — Yara answers in Tanglish.
          </p>
        </div>
        <VoiceAgent />
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/text-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Text Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/analytics-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Analytics Agent →</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/website-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Website Developing →</Link>
        </div>
      </div>
    </section>
  );
}
