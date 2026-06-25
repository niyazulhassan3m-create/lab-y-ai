"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const agents = [
  { emoji: "💬", title: "Text Agent", desc: "Chatbots for websites, WhatsApp, Instagram & Facebook", href: "/agents/text-agent" },
  { emoji: "🎙️", title: "Voice Agent", desc: "Inbound & outbound AI voice calls with Tanglish", href: "/agents/voice-agent" },
  { emoji: "🧪", title: "Testing Agent", desc: "AI-powered QA automation at scale", href: "/agents/testing-agent" },
  { emoji: "📊", title: "Analytics Agent", desc: "Ad & performance analytics with AI insights", href: "/agents/analytics-agent" },
  { emoji: "🎨", title: "Media Agent", desc: "AI content & image generation", href: "/agents/media-agent" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: i * 0.1 },
  }),
};

const steps = [
  { num: "01", title: "Choose Your Agent", desc: "Pick from 5 specialized AI agents — Text, Voice, Testing, Analytics, or Media." },
  { num: "02", title: "Deploy in Minutes", desc: "No coding needed. Our platform connects your business in under 15 minutes." },
  { num: "03", title: "Watch It Work", desc: "Your AI agent handles conversations, tests, analytics, and content — all in Tanglish." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden min-h-screen flex items-center">
        <NeuralNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none z-[1]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-600/20 bg-accent-600/10 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent-400 font-medium">All-in-One AI Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Create & Deploy<br />
            <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">AI Agents</span><br />
            That Work Like a Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-grey-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          >
            Text Agent <span className="text-grey-600">•</span> Voice Agent <span className="text-grey-600">•</span> Testing <span className="text-grey-600">•</span> Analytics <span className="text-grey-600">•</span> Media
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center gap-4"
          >
            <Link href="/agents" className="group relative px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-accent-500">
              <span className="relative z-10">Explore All Agents</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            <Link href="/demos" className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all backdrop-blur-sm">
              Try Demos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />

      {/* Stats */}
      <AnimatedSection>
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-900/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <GlassCard className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "5", label: "AI Agents" },
                  { value: "50+", label: "Enterprise Clients" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-accent-400 to-accent-600 bg-clip-text text-transparent">{s.value}</p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-grey-500 mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* Gradient Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />

      {/* Technology + How It Works */}
      <AnimatedSection>
        <section className="relative py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-900/10 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">Our AI Technology</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built on Advanced AI</h2>
            <p className="text-grey-300 text-lg max-w-2xl mx-auto mb-16">
              Powered by Google Gemini, Web Speech API, and Vapi telephony — our agents
              understand Tanglish, respond naturally, and automate your business 24/7.
            </p>
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 text-center mb-8">How It Works</p>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="text-center"
                >
                  <GlassCard className="p-8 h-full">
                    <span className="text-4xl font-bold text-accent-600/30 block mb-4">{s.num}</span>
                    <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-grey-400">{s.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Gradient Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />

      {/* Agents Preview */}
      <AnimatedSection>
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">The Agent Team</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">One Platform. Five AI Agents.</h2>
              <p className="text-grey-400 text-lg max-w-2xl mx-auto">From customer conversations to content creation — all powered by AI with Tanglish support.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
              {agents.map((a, i) => (
                <motion.div
                  key={a.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="w-full"
                >
                  <Link href={a.href} className="group block h-full">
                    <GlassCard className="p-6 h-full">
                      <span className="text-2xl block mb-4">{a.emoji}</span>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-accent-400 transition-colors">{a.title}</h3>
                      <p className="text-sm text-grey-400">{a.desc}</p>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Gradient Divider */}
      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-accent-600/20 to-transparent" />

      {/* CTA */}
      <AnimatedSection>
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GlassCard className="p-12 md:p-16">
              <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-4">14-Day Free Trial</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-grey-400 mb-8 max-w-lg mx-auto">
                Deploy AI agents that automate sales, support, marketing, and analytics — all with natural Tanglish conversation.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/contact" className="group relative px-8 py-3.5 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-accent-500">
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </Link>
                <Link href="/pricing" className="px-8 py-3.5 rounded-lg border border-white/10 text-grey-300 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all backdrop-blur-sm">
                  View Pricing
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
