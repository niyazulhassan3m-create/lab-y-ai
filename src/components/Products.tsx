const products = [
  {
    title: "Enterprise SaaS",
    description:
      "Scalable, secure, and customizable SaaS platforms built for B2B enterprises. From analytics to workflow automation, we deliver end-to-end solutions.",
    icon: "⚙️",
  },
  {
    title: "Micro SaaS",
    description:
      "Lean, focused SaaS products that solve specific business problems. Fast to deploy, easy to integrate, and built for measurable ROI.",
    icon: "📦",
  },
  {
    title: "AI Voice Agents",
    description:
      "Intelligent voice agents powered by LLMs that handle sales calls, customer support, and appointment scheduling with human-like conversation.",
    icon: "🎙️",
  },
  {
    title: "AI-Integrated CRMs",
    description:
      "Next-generation CRM platforms with embedded AI — lead scoring, sentiment analysis, automated follow-ups, and predictive analytics.",
    icon: "🧠",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 px-4 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What We Build
          </h2>
          <p className="text-grey-400 text-lg max-w-xl mx-auto">
            Purpose-built AI products that give your business a competitive
            edge.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="group rounded-xl border border-grey-800 bg-card p-6 hover:bg-card-hover hover:border-accent-700/40 hover:shadow-lg hover:shadow-accent-700/5 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-grey-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
