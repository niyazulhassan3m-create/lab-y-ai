import Link from "next/link";

const agents = [
  { img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=150&q=80&auto=format&fit=crop", title: "Text Agent", desc: "Chatbots for websites, WhatsApp, Instagram & Facebook", href: "/agents/text-agent" },
  { img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=150&q=80&auto=format&fit=crop", title: "Voice Agent", desc: "Inbound & outbound AI voice calls", href: "/agents/voice-agent" },
  { img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&q=80&auto=format&fit=crop", title: "3D Avatar Agent", desc: "Lifelike digital humans", href: "/agents/3d-avatar-agent" },
  { img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=80&auto=format&fit=crop", title: "Testing Agent", desc: "AI-powered QA automation", href: "/agents/testing-agent" },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80&auto=format&fit=crop", title: "Analytics Agent", desc: "Ad & performance analytics", href: "/agents/analytics-agent" },
  { img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=150&q=80&auto=format&fit=crop", title: "Media Agent", desc: "AI content & image generation", href: "/agents/media-agent" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-600/15 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">All-in-One AI Platform</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Create & Deploy<br />
            <span className="text-accent-400">AI Agents</span><br />
            That Work Like a Team
          </h1>
          <p className="text-grey-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Text Agent • Voice Agent • 3D Avatar • Testing • Analytics • Media
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/agents" className="px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
              Explore All Agents
            </Link>
            <Link href="/demos" className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
              Try Demos
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6", label: "AI Agents" },
              { value: "50+", label: "Enterprise Clients" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-bold text-accent-400">{s.value}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-grey-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">The Agent Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">One Platform. Six AI Agents.</h2>
            <p className="text-grey-400 text-lg">From customer conversations to content creation — all powered by AI with Tanglish support.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((a, i) => (
              <Link key={i} href={a.href} className="group rounded-2xl border border-white/5 bg-card p-6 hover:border-accent-600/30 transition-all duration-300">
                <img src={a.img} alt={a.title} className="w-10 h-10 rounded-lg object-cover mb-3" />
                <h3 className="text-lg font-bold mb-1 group-hover:text-accent-400 transition-colors">{a.title}</h3>
                <p className="text-sm text-grey-400">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-accent-900/30 to-card p-12 md:p-16">
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
          </div>
        </div>
      </section>
    </>
  );
}
