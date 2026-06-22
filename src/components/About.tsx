export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Lab-Y</h2>
        <p className="text-grey-400 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
          Lab-Y AI Solutions is a B2B technology company specializing in
          artificial intelligence products. We combine deep expertise in SaaS
          architecture, conversational AI, and enterprise CRM systems to build
          tools that actually move the needle.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { value: "50+", label: "Enterprise Clients" },
            { value: "99.9%", label: "Platform Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-grey-800 bg-card p-6 hover:border-accent-700/30 transition-colors duration-300"
            >
              <div className="text-3xl font-bold text-accent-400 mb-1">
                {stat.value}
              </div>
              <div className="text-grey-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
