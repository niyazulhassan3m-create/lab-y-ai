import Link from "next/link";

const demos = [
  {
    title: "Text Agent",
    tagline: "Chatbot Demo",
    desc: "Chat with Yara on websites, WhatsApp, Instagram & Facebook. Captures leads and answers questions in Tanglish.",
    img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=200&q=80&auto=format&fit=crop",
    features: ["Multi-platform support", "Tanglish conversation", "Lead capture", "24/7 availability"],
    interactive: true,
    href: "/agents/text-agent",
    demoLink: null,
  },
  {
    title: "Voice Agent",
    tagline: "Call Agent Demo",
    desc: "Real phone calls or browser voice. Yara answers customer questions in Tanglish with AI-powered natural conversation.",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=200&q=80&auto=format&fit=crop",
    features: ["Real phone calls (Vapi)", "Browser voice agent", "Tanglish AI conversation", "Call analytics"],
    interactive: true,
    href: "/agents/voice-agent",
    demoLink: null,
  },
  {
    title: "Testing Agent",
    tagline: "QA Automation Demo",
    desc: "AI-powered test generation and execution. Reduce QA time by 80% with automated testing.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80&auto=format&fit=crop",
    features: ["Auto test generation", "Cross-browser testing", "Visual regression", "Bug reporting"],
    interactive: true,
    href: "/agents/testing-agent",
    demoLink: null,
  },
  {
    title: "Analytics Agent",
    tagline: "Insights Demo",
    desc: "Track Google Ads, Meta Ads, and business performance. AI-powered reports and recommendations.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80&auto=format&fit=crop",
    features: ["Ad analytics dashboard", "ROI tracking", "Sentiment analysis", "Daily AI briefings"],
    interactive: true,
    href: "/agents/analytics-agent",
    demoLink: null,
  },
  {
    title: "Media Agent",
    tagline: "Content Gen Demo",
    desc: "Generate marketing visuals, social posts, logos, and videos from text prompts.",
    img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=200&q=80&auto=format&fit=crop",
    features: ["Image generation", "Video creation", "Social posters", "Brand assets"],
    interactive: true,
    href: "/agents/media-agent",
    demoLink: null,
  },
  {
    title: "Website Developing",
    tagline: "AI-Integrated Custom Websites",
    desc: "We build fully custom websites with AI integration — chatbots, voice agents, analytics, and more. You describe, we build and deliver.",
    img: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=200&q=80&auto=format&fit=crop",
    features: ["Custom design & development", "AI feature integration", "Responsive & SEO-ready", "Fast turnaround delivery"],
    interactive: true,
    href: "/agents/website-agent",
    demoLink: null,
  },
];

export default function Demos() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/15 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">Try It Yourself</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Interactive Demos</h1>
          <p className="text-grey-400 text-lg max-w-2xl mx-auto">
            Try all six AI services interactively — no signup required.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {demos.map((d, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-card p-8 md:p-10 hover:border-accent-600/20 transition-all duration-500 group">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={d.img} alt={d.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h2 className="text-xl font-bold">{d.title}</h2>
                      <p className="text-[11px] tracking-[0.15em] uppercase text-accent-400">{d.tagline}</p>
                    </div>
                  </div>
                  <p className="text-grey-400 text-sm leading-relaxed mb-6">{d.desc}</p>
                  <div className="flex items-center gap-4">
                    <Link href={d.href} className="inline-flex px-5 py-2.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-500 transition-all">
                      Try Now →
                    </Link>
                    {d.demoLink && (
                      <a href={d.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex px-5 py-2.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white/5 transition-all backdrop-blur-sm">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-grey-500 mb-4">Features</p>
                  <ul className="space-y-3">
                    {d.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-grey-300">
                        <svg className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-accent-900/30 to-card p-12 md:p-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">Need Help Choosing?</p>
            <h2 className="text-3xl font-bold mb-6">We&apos;ll Pick the Right Agent</h2>
            <p className="text-grey-400 mb-8 max-w-lg mx-auto">
              Tell us your goals and we&apos;ll recommend the perfect AI solution for your business.
            </p>
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
