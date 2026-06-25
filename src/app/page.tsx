import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import GlassCard from "@/components/GlassCard";

const agents = [
  { img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=150&q=80&auto=format&fit=crop", title: "Text Agent", desc: "Chatbots for websites, WhatsApp, Instagram & Facebook", href: "/agents/text-agent" },
  { img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=150&q=80&auto=format&fit=crop", title: "Voice Agent", desc: "Inbound & outbound AI voice calls", href: "/agents/voice-agent" },
  { img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=80&auto=format&fit=crop", title: "Testing Agent", desc: "AI-powered QA automation", href: "/agents/testing-agent" },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80&auto=format&fit=crop", title: "Analytics Agent", desc: "Ad & performance analytics", href: "/agents/analytics-agent" },
  { img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=150&q=80&auto=format&fit=crop", title: "Media Agent", desc: "AI content & image generation", href: "/agents/media-agent" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden min-h-screen flex items-center">
        <NeuralNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none z-[1]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-600/20 bg-accent-600/10 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent-400 font-medium">All-in-One AI Platform</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Create & Deploy<br />
            <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">AI Agents</span><br />
            That Work Like a Team
          </h1>
          <p className="text-grey-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Text Agent <span className="text-grey-600">•</span> Voice Agent <span className="text-grey-600">•</span> Testing <span className="text-grey-600">•</span> Analytics <span className="text-grey-600">•</span> Media
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/agents" className="group relative px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-accent-500">
              <span className="relative z-10">Explore All Agents</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            <Link href="/demos" className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all backdrop-blur-sm">
              Try Demos
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-900/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <GlassCard className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "5", label: "AI Agents" },
                { value: "50+", label: "Enterprise Clients" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-accent-400 to-accent-600 bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-grey-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Technology */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]/80" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">Our AI Technology</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built on Advanced AI</h2>
          <p className="text-grey-300 text-lg max-w-2xl mx-auto">
            Powered by Google Gemini, Web Speech API, and Vapi telephony — our agents
            understand Tanglish, respond naturally, and automate your business 24/7.
          </p>
        </div>
      </section>

      {/* Agents Preview */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">The Agent Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">One Platform. Five AI Agents.</h2>
            <p className="text-grey-400 text-lg max-w-2xl mx-auto">From customer conversations to content creation — all powered by AI with Tanglish support.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((a, i) => (
              <Link key={i} href={a.href} className="group">
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 border border-white/5">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-accent-400 transition-colors">{a.title}</h3>
                  <p className="text-sm text-grey-400">{a.desc}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="p-12 md:p-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">14-Day Free Trial</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-grey-400 mb-8 max-w-lg mx-auto">
              Deploy AI agents that automate sales, support, marketing, and analytics — all with natural Tanglish conversation.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
                Get Started Free
              </Link>
              <Link href="/pricing" className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                View Pricing
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
