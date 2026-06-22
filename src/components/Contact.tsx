export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-grey-900/60 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent-800/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="text-grey-400 text-lg mb-10 max-w-lg mx-auto">
          Tell us about your business needs and we&apos;ll craft the perfect AI
          solution.
        </p>
        <form className="space-y-5 max-w-lg mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-grey-800 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/50 focus:ring-1 focus:ring-accent-600/30 transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-grey-800 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/50 focus:ring-1 focus:ring-accent-600/30 transition"
            />
          </div>
          <select className="w-full px-4 py-3 rounded-lg border border-grey-800 bg-card text-grey-400 focus:outline-none focus:border-accent-600/50 focus:ring-1 focus:ring-accent-600/30 transition">
            <option value="">I&apos;m interested in...</option>
            <option value="saas">Enterprise SaaS</option>
            <option value="micro-saas">Micro SaaS</option>
            <option value="voice">AI Voice Agents</option>
            <option value="crm">AI-Integrated CRM</option>
            <option value="other">Other</option>
          </select>
          <textarea
            rows={4}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 rounded-lg border border-grey-800 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/50 focus:ring-1 focus:ring-accent-600/30 transition resize-none"
          />
          <button
            type="submit"
            className="w-full px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent-600 to-accent-800 text-white font-medium hover:from-accent-500 hover:to-accent-700 transition-all duration-300 shadow-lg shadow-accent-700/25 hover:shadow-accent-600/40"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
