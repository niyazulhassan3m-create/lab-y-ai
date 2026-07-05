import Link from "next/link";

const agents = [
  { href: "/agents/text-agent", title: "Text Agent", desc: "Conversational AI chatbot for websites, WhatsApp, Instagram & Facebook", img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=150&q=80&auto=format&fit=crop", color: "from-blue-900/30" },
  { href: "/agents/voice-agent", title: "Voice Agent", desc: "Inbound & outbound AI voice calls with Tanglish support", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=150&q=80&auto=format&fit=crop", color: "from-green-900/30" },
  { href: "/agents/testing-agent", title: "Testing Agent", desc: "AI-powered QA automation & test generation", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=80&auto=format&fit=crop", color: "from-yellow-900/30" },
  { href: "/agents/analytics-agent", title: "Analytics Agent", desc: "Ad analytics, ROI tracking & performance insights", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80&auto=format&fit=crop", color: "from-red-900/30" },
  { href: "/agents/media-agent", title: "Media Agent", desc: "AI content & image generation for marketing", img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=150&q=80&auto=format&fit=crop", color: "from-pink-900/30" },
  { href: "/agents/website-agent", title: "Website Developing", desc: "AI-integrated custom website development — we build it for you", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80&auto=format&fit=crop", color: "from-purple-900/30" },
];

export default function AgentsPage() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">AI Agents</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Six Agents. One Platform.</h1>
          <p className="text-grey-400 text-lg max-w-2xl mx-auto">
            From chatbots to voice calls, analytics to content — deploy AI agents that work as a team.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <Link key={a.href} href={a.href} className={`group rounded-2xl border border-white/5 bg-gradient-to-br ${a.color} to-card p-6 hover:border-accent-600/30 transition-all duration-300`}>
                            <img src={a.img} alt={a.title} className="w-10 h-10 rounded-lg object-cover mb-3" />
              <h2 className="text-lg font-bold mb-1 group-hover:text-accent-400 transition-colors">{a.title}</h2>
              <p className="text-sm text-grey-400">{a.desc}</p>
              <span className="inline-block mt-4 text-[10px] uppercase tracking-wider text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">Try now →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
