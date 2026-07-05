import Link from "next/link";

const agents = [
  {
    title: "Text Agent",
    tagline: "Conversational AI Chatbot",
    desc: "AI chatbot that works across websites, WhatsApp, Instagram, and Facebook. Captures leads, answers questions, and qualifies prospects 24/7 with natural conversation.",
    img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=200&q=80&auto=format&fit=crop",
    features: ["Website chatbot", "WhatsApp integration", "Instagram & Facebook DM", "Lead capture & qualification", "Custom knowledge base", "Multi-language (incl. Tanglish)"],
  },
  {
    title: "Voice Agent",
    tagline: "AI Call Handler",
    desc: "AI voice agent for inbound and outbound calls. Natural conversation with sentiment analysis, intent detection, and seamless human handoff. Supports Tanglish.",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=200&q=80&auto=format&fit=crop",
    features: ["Inbound call answering", "Outbound cold calling", "Sentiment analysis", "Intent detection", "Live agent handoff", "Call summaries & analytics"],
  },
  {
    title: "Testing Agent",
    tagline: "AI QA & Automation",
    desc: "Automated testing for web and mobile applications. AI generates test cases, executes them, and reports bugs — reducing QA time by 80%.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80&auto=format&fit=crop",
    features: ["Automated test generation", "Cross-browser testing", "API testing", "Visual regression", "Bug reporting", "CI/CD integration"],
  },
  {
    title: "Analytics Agent",
    tagline: "Data & Ad Insights",
    desc: "Track Google Ads, Meta Ads, and overall business performance. AI-powered reports, anomaly detection, and actionable recommendations to improve ROI.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80&auto=format&fit=crop",
    features: ["Google Ads analytics", "Meta Ads performance", "Conversion tracking", "ROI reporting", "Anomaly detection", "Daily AI briefings"],
  },
  {
    title: "Media Agent",
    tagline: "AI Content Creation",
    desc: "Generate marketing visuals, social media posts, logos, videos, and AI influencer content. From text prompt to production-ready assets in seconds.",
    img: "https://images.unsplash.com/photo-1558478551-1a378f63328e?w=200&q=80&auto=format&fit=crop",
    features: ["Image generation", "Video creation", "Logo & brand assets", "Social media posters", "AI influencer avatars", "Batch generation"],
  },
  {
    title: "Website Developing",
    tagline: "AI-Powered Fast-Turnaround Websites",
    desc: "Get a fully functional, modern website built in days — not weeks. AI generates layout, content, and styling based on your business profile. Fully customizable, responsive, and SEO-optimized.",
    img: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=200&q=80&auto=format&fit=crop",
    features: ["AI-generated layouts", "Responsive design", "SEO optimization", "Content generation", "Contact forms & CTAs", "Fast turnaround (3-5 days)"],
  },
];

export default function Services() {
  return (
    <>
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">
              Our Agents
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              AI Agents for Every Business Need
            </h1>
             <p className="text-grey-400 text-lg max-w-2xl mx-auto">
              Six specialized AI services — from chatbots to voice calls, analytics to website development.
            </p>
          </div>

          <div className="space-y-6">
            {agents.map((a, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-card p-8 md:p-10 hover:border-accent-600/20 transition-all duration-500 group">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <img src={a.img} alt={a.title} className="w-14 h-14 rounded-xl object-cover mb-4" />
                    <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-1">{a.tagline}</p>
                    <h2 className="text-2xl font-bold mb-4">{a.title}</h2>
                    <p className="text-grey-400 leading-relaxed mb-6">{a.desc}</p>
                    <Link href="/contact" className="inline-flex px-5 py-2.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-500 transition-all">
                      Get This Agent
                    </Link>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-grey-500 mb-4">Key Features</p>
                    <ul className="space-y-3">
                      {a.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-grey-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-accent-900/30 to-card p-12 md:p-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">Not Sure Which Agent?</p>
            <h2 className="text-3xl font-bold mb-6">We&apos;ll Help You Choose</h2>
            <p className="text-grey-400 mb-8 max-w-lg mx-auto">
              Tell us about your business challenges and we&apos;ll recommend the right AI agent — or a combination of agents.
            </p>
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
