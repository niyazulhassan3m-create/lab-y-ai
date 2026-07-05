"use client";

import { useState } from "react";
import Link from "next/link";

const GEMINI_OK = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function MediaAgentPage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [format, setFormat] = useState<"social" | "banner" | "logo">("social");

  const generate = async () => {
    if (!prompt.trim()) return;
    if (!GEMINI_OK) {
      const colors = ["accent", "blue", "green", "yellow", "purple"];
        const c = colors[Math.floor(Math.random() * colors.length)];
      setImage(`https://placehold.co/600x400/1e1e1e/9B2D3E?text=${encodeURIComponent(prompt.slice(0, 30))}`);
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/voice-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Generate a marketing image description for: "${prompt}". Format: ${format}. Return ONLY a DALL-E prompt (max 200 chars)`,
          history: [],
        }),
      });
      const data = await res.json();
      if (data.response && !data.response.startsWith("⚠️")) {
        setImage(`https://placehold.co/600x400/1e1e1e/9B2D3E?text=${encodeURIComponent(data.response.slice(0, 50))}`);
      }
    } catch {
      setImage(`https://placehold.co/600x400/1e1e1e/9B2D3E?text=Error+generating`);
    } finally { setGenerating(false); }
  };

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3 mt-2">AI Agent</p>
          <h1 className="text-4xl font-bold mb-3">Media Agent</h1>
          <p className="text-grey-400">Generate marketing visuals with AI.</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-card/80 backdrop-blur-sm p-6">
          <div className="flex gap-2 mb-4">
            {(["social", "banner", "logo"] as const).map((f) => (
              <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 rounded-lg text-[11px] font-medium uppercase tracking-wide transition-all ${format === f ? "bg-accent-600/20 border border-accent-600/30 text-accent-400" : "border border-white/10 text-grey-400 hover:text-grey-200"}`}>{f}</button>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()} placeholder={format === "social" ? "e.g., AI Voice Agent for sales..." : format === "banner" ? "e.g., Enterprise SaaS banner..." : "e.g., Lab Y modern logo..."} className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30" />
            <button onClick={generate} disabled={!prompt.trim() || generating} className="px-5 py-3 rounded-xl bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all text-sm">
              {generating ? "..." : "Generate"}
            </button>
          </div>

          {image && (
            <div className="rounded-xl border border-white/5 overflow-hidden">
              <img src={image} alt="Generated content" className="w-full h-auto" />
              <div className="p-3 bg-white/5 flex justify-between items-center">
                <span className="text-[10px] text-grey-500">AI-generated preview ({format})</span>
                <button onClick={() => { const a = document.createElement("a"); a.href = image; a.download = `lab-y-${format}.png`; a.click(); }} className="text-[10px] text-accent-400 hover:underline">Download</button>
              </div>
            </div>
          )}

          {!GEMINI_OK && !image && (
            <div className="text-center py-8">
              <p className="text-grey-500 text-sm">Enter a prompt and generate a preview</p>
              <p className="text-grey-600 text-xs mt-1">Add <code className="text-accent-300">NEXT_PUBLIC_GEMINI_API_KEY</code> for AI-powered descriptions</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/agents/analytics-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Analytics Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/website-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Website Developing →</Link>
        </div>
      </div>
    </section>
  );
}
