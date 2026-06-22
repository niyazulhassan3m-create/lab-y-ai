const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We analyze your workflows, pain points, and goals to define the perfect AI solution.",
  },
  {
    num: "02",
    title: "Build & Integrate",
    desc: "Our team engineers the product and integrates it seamlessly into your existing stack.",
  },
  {
    num: "03",
    title: "Deploy & Scale",
    desc: "We handle deployment, monitoring, and optimization so you can focus on growth.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-grey-900/60 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-800/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-grey-400 text-lg max-w-xl mx-auto">
            From idea to deployment — a proven process that delivers results.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-accent-900/60 border border-accent-700/30 flex items-center justify-center mx-auto mb-5 group-hover:border-accent-600/50 group-hover:bg-accent-800/60 transition-all duration-300">
                <span className="text-xl font-bold text-accent-400">{s.num}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-grey-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
