import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "0000",
    period: "",
    desc: "Perfect for small businesses getting started with AI.",
    features: [
      { text: "Text Agent (Chat)", detail: "One Chatbot • Custom Text Agent • Max 50 pages • 10K conversations" },
      { text: "Voice (Call) Agent", detail: "10 calls/day • Max 100 calls/month • Outbound Calling" },
      { text: "Analytics Agent", detail: "25 AI reports/month • Basic analytics & insights" },
      { text: "Media Agent", detail: "100 images/month • Max 10/day • 2 videos (up to 5s)" },
      { text: "Website Developing", detail: "AI-integrated custom website — 1 site • Fast turnaround" },
      { text: "Email support", detail: "" },
      { text: "Projects", detail: "One Project" },
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    price: "0000",
    period: "",
    desc: "Perfect for growing businesses scaling their AI use.",
    features: [
      { text: "Text Agent (Chat)", detail: "Two Chatbots • Custom Text Agent • Max 100 pages • 20K conversations" },
      { text: "Voice (Call) Agent", detail: "30 calls/day • Max 200 calls/month • Outbound Calling" },
      { text: "Analytics Agent", detail: "50 AI reports/month • Conversion & performance insights" },
      { text: "Media Agent", detail: "200 images/month • Max 20/day • 10 videos (up to 5s)" },
      { text: "Website Developing", detail: "AI-integrated custom website — 1 site • Custom domain ready" },
      { text: "Priority Email support", detail: "" },
      { text: "Projects", detail: "One Project" },
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Professional",
    price: "0000",
    period: "",
    desc: "For scaling businesses with advanced AI needs.",
    features: [
      { text: "Text Agent (Chat)", detail: "Multiple Chatbots • Custom Text, Voice-ready • Max 200 pages • 40K conversations" },
      { text: "Voice (Call) Agent", detail: "50 calls/day • Max 500 calls/month • Outbound Calling" },
      { text: "Analytics Agent", detail: "100 AI reports/month • Advanced analytics & insights" },
      { text: "Media Agent", detail: "400 images/month • Max 50/day • 20 videos (up to 5s)" },
      { text: "Website Developing", detail: "AI-integrated custom websites — 3 sites • Custom domain • SEO" },
      { text: "Priority & WhatsApp support", detail: "" },
      { text: "Projects", detail: "Multiple Projects" },
    ],
    cta: "Get Started",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">Simple Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-grey-400 text-lg max-w-2xl mx-auto">
              Flexible pricing options to fit businesses of all sizes. No hidden fees. 14-day free trial on all plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-8 flex flex-col ${
                  p.featured
                    ? "border-accent-600/40 bg-gradient-to-b from-accent-900/20 to-card shadow-lg shadow-accent-600/10 scale-105"
                    : "border-white/5 bg-card"
                }`}
              >
                {p.featured && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent-400 font-bold mb-2">Most Popular</span>
                )}
                <h2 className="text-xl font-bold mb-1">{p.name}</h2>
                <p className="text-grey-400 text-sm mb-4">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-grey-500 text-sm">{p.period}</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="text-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="text-grey-200 font-medium">{f.text}</p>
                          {f.detail && <p className="text-grey-500 text-[11px]">{f.detail}</p>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full py-3 rounded-xl text-center text-[11px] font-bold tracking-[0.15em] uppercase transition-all ${
                    p.featured
                      ? "bg-accent-600 text-white hover:bg-accent-500"
                      : "border border-white/10 text-grey-300 hover:bg-white/5"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent-900/30 to-card p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
              <p className="text-grey-400 mb-2">Custom pricing for large organizations.</p>
              <p className="text-sm text-grey-500 mb-6">
                All agents included • Unlimited calls & reports • Testing Agent • 24/7 dedicated support
              </p>
              <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
