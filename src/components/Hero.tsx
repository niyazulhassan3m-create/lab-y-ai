import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-700/20 via-accent-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-800/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-600/30 bg-accent-900/40 text-accent-300 text-sm mb-8 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
          AI-Powered Enterprise Solutions
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Build Smarter with{" "}
          <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
            ZiX AI
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-grey-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          We engineer SaaS, Micro SaaS, AI voice agents, and AI-integrated CRMs
          that drive real business outcomes for B2B enterprises.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 text-white font-medium hover:from-accent-500 hover:to-accent-600 transition-all duration-300 shadow-lg shadow-accent-700/25 hover:shadow-accent-600/40"
          >
            Get in Touch
          </Link>
          <Link
            href="#products"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-lg border border-grey-700 text-grey-300 font-medium hover:border-accent-600/50 hover:text-accent-300 transition-all duration-300"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
