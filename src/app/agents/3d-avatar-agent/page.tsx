"use client";

import Link from "next/link";
import Avatar3D from "@/components/Avatar3D";

const locations = [
  { name: "Shopping Malls", icon: "🏬" },
  { name: "Retail Stores", icon: "🏪" },
  { name: "Banks", icon: "🏛️" },
  { name: "Corporate Lobbies", icon: "🏢" },
  { name: "Airports", icon: "✈️" },
  { name: "Events", icon: "🎪" },
];

const steps = [
  { num: "01", title: "User Approaches", desc: "The user enters the avatar's proximity zone." },
  { num: "02", title: "AI Detects", desc: "Sensors detect presence and initiate engagement." },
  { num: "03", title: "Avatar Engages", desc: "Begins a natural conversation with speech and expressions." },
  { num: "04", title: "AI Analyzes", desc: "Conversation is recorded and analyzed for insights." },
  { num: "05", title: "AI Acts", desc: "Escalates to a human or captures lead information." },
];

export default function ThreeDAvatarPage() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero */}
        <div className="text-center mb-6">
          <Link href="/demos" className="text-[10px] tracking-[0.2em] uppercase text-accent-400 hover:text-accent-300 inline-block">← Back to Demos</Link>
          <span className="ml-4 inline-block px-3 py-1 rounded-full bg-accent-600/10 border border-accent-600/20 text-accent-400 text-[10px] tracking-wider uppercase font-bold">Coming Soon</span>
        </div>

        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">AI Agent</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Bring AI to life with <span className="text-accent-400">3D avatar</span> agents.
          </h1>
          <p className="text-grey-400 text-lg max-w-3xl mx-auto">
            Deploy interactive, multilingual 3D avatars in physical spaces and digital screens
            to engage, guide, and sell — 24/7. Move your mouse — Yara & Arjun follow your eyes.
          </p>
        </div>

        {/* Interactive Avatar Demo */}
        <div className="mb-16">
          <Avatar3D />
        </div>

        {/* Deploy Locations */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-center text-grey-500 mb-6">Deploy Avatars Anywhere People Walk In</p>
          <p className="text-center text-grey-400 text-sm mb-8">One avatar. Multiple locations. Unlimited interactions.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm p-4 text-center hover:border-accent-600/30 transition-all">
                <p className="text-2xl mb-1">{loc.icon}</p>
                <p className="text-[11px] font-medium tracking-wide">{loc.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur-sm p-6">
            <p className="text-[10px] tracking-wider uppercase text-accent-400 mb-1">Use Case</p>
            <h3 className="text-lg font-bold mb-3">Virtual Salesperson</h3>
            <p className="text-grey-400 text-sm mb-4">
              Engage customers with dynamic product explanations, demonstrations, and personalized recommendations to drive sales.
            </p>
            <ul className="space-y-2">
              {["Lead capture & follow-up", "Feature demonstrations", "Offer recommendations & upsell"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-grey-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur-sm p-6">
            <p className="text-[10px] tracking-wider uppercase text-accent-400 mb-1">Use Case</p>
            <h3 className="text-lg font-bold mb-3">Virtual Receptionist</h3>
            <p className="text-grey-400 text-sm mb-4">
              Welcome visitors, provide navigation, and manage appointments, creating a seamless and efficient front-desk experience.
            </p>
            <ul className="space-y-2">
              {["Visitor greeting & navigation", "Appointment guidance", "Queue & desk routing"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-grey-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-center text-grey-500 mb-2">How It Works</p>
          <p className="text-center text-grey-400 text-sm mb-8">
            From presence detection to intelligent interaction, our avatars provide a seamless user journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="relative rounded-2xl border border-white/5 bg-card/40 backdrop-blur-sm p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-accent-600/20 border border-accent-600/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent-400 text-sm font-bold">{step.num}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-[11px] text-grey-500">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-3 text-grey-700 text-lg">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gender Models Section */}
        <div className="text-center mb-12 rounded-2xl border border-white/5 bg-card/40 backdrop-blur-sm p-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">Choose Your Model</p>
          <p className="text-grey-400 text-sm mb-4">Switch between Yara and Arjun — each with unique expressions, voice pitch, and style.</p>
          <p className="text-grey-500 text-xs">
            Use the toggle on the avatar card above to switch between Female / Male models.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-grey-400 text-sm mb-4">Turn physical spaces into intelligent experiences.</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-accent-600 text-white text-[11px] font-bold tracking-wider uppercase hover:bg-accent-500 transition-all">
              Coming Soon
            </button>
            <Link href="/agents" className="px-6 py-3 rounded-xl border border-white/10 text-grey-300 text-[11px] font-bold tracking-wider uppercase hover:bg-white/5 transition-all">
              Explore Other Agents
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Link href="/agents/voice-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">← Voice Agent</Link>
          <span className="text-grey-700">|</span>
          <Link href="/agents/testing-agent" className="text-[11px] text-grey-500 hover:text-accent-400 transition-colors">Testing Agent →</Link>
        </div>
      </div>
    </section>
  );
}
