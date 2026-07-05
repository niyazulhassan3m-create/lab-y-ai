"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebsiteBuilderDemo() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [generated, setGenerated] = useState(false);

  const styles = [
    { name: "Minimal", desc: "Clean, white space, modern" },
    { name: "Corporate", desc: "Professional, trust, formal" },
    { name: "Creative", desc: "Bold colors, dynamic layout" },
    { name: "Luxury", desc: "Dark, premium, elegant" },
  ];

  const handleGenerate = () => {
    setGenerated(true);
  };

  const reset = () => {
    setStep(0);
    setBusiness("");
    setIndustry("");
    setStyle("");
    setGenerated(false);
  };

  if (generated) {
    return (
      <section className="pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-600/20 bg-accent-600/10 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-green-400 font-medium">Your Site is Ready</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {business || "Your Business"} Website
          </h1>
          <p className="text-grey-400 text-lg mb-10">Preview of your AI-integrated custom website.</p>

          {/* Mock website preview */}
          <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 text-left">
            {/* Mock browser chrome */}
            <div className="bg-card px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[10px] text-grey-600 bg-white/5 px-3 py-1 rounded-full">{business?.toLowerCase().replace(/\s+/g, "-") || "your-business"}.lab-y.ai</span>
              </div>
            </div>

            {/* Mock site content */}
            <div className="p-8 md:p-12 bg-background">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 border border-accent-600/20 mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-accent-400">AI-Powered</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{business || "Your Business"}</h2>
                <p className="text-grey-400 max-w-lg mx-auto">{industry ? `Leading ${industry} solutions` : "Transforming ideas into reality"}</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <span className="px-5 py-2.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-wider uppercase">Get Started</span>
                  <span className="px-5 py-2.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-wider uppercase">Learn More</span>
                </div>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                {[
                  { label: "Responsive", desc: "Works on all devices" },
                  { label: "SEO Ready", desc: "Optimized for search" },
                  { label: "Fast Load", desc: "Built for speed" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl border border-white/5 bg-card p-5 text-center">
                    <p className="text-sm font-bold mb-1">{f.label}</p>
                    <p className="text-xs text-grey-500">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Style tag */}
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-accent-400">Style: {style || "Modern"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
              Get This Website Built
            </Link>
            <button onClick={reset} className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all backdrop-blur-sm cursor-pointer">
              Build Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">AI Website Builder</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Generate Your Website</h1>
          <p className="text-grey-400 text-sm">Answer 3 quick questions and see your AI-powered website in seconds.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`w-8 h-1 rounded-full transition-all duration-300 ${s <= step ? "bg-accent-600" : "bg-white/10"}`} />
          ))}
        </div>

        {/* Step 0: Business Name */}
        {step === 0 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">What&apos;s your business name?</h2>
            <p className="text-grey-400 text-sm mb-6">We&apos;ll use this to generate your site content and domain.</p>
            <input
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="e.g., Lab Y AI Solutions"
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-grey-600 focus:outline-none focus:border-accent-600/50 transition-all text-center text-lg"
            />
            <button
              onClick={() => business.trim() && setStep(1)}
              disabled={!business.trim()}
              className="mt-6 px-8 py-3 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 1: Industry */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">What industry are you in?</h2>
            <p className="text-grey-400 text-sm mb-6">This helps us tailor the content and design.</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {["Technology", "Healthcare", "Education", "E-commerce", "Finance", "Real Estate", "Creative Agency", "Consulting"].map((ind) => (
                <button
                  key={ind}
                  onClick={() => { setIndustry(ind); setStep(2); }}
                  className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                    industry === ind
                      ? "border-accent-600 bg-accent-600/10 text-accent-400"
                      : "border-white/10 text-grey-300 hover:border-accent-600/30 hover:text-white"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="mt-6 text-xs text-grey-500 hover:text-grey-300 transition-colors cursor-pointer">
              ← Back
            </button>
          </div>
        )}

        {/* Step 2: Style */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">Choose your style</h2>
            <p className="text-grey-400 text-sm mb-6">Pick the design direction for your website.</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {styles.map((s) => (
                <button
                  key={s.name}
                  onClick={() => { setStyle(s.name); }}
                  className={`px-4 py-5 rounded-xl border text-left transition-all cursor-pointer ${
                    style === s.name
                      ? "border-accent-600 bg-accent-600/10"
                      : "border-white/10 hover:border-accent-600/30"
                  }`}
                >
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="text-[10px] text-grey-500 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setStep(1)} className="text-xs text-grey-500 hover:text-grey-300 transition-colors cursor-pointer">
                ← Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={!style}
                className="px-8 py-3 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Generate My Site
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
