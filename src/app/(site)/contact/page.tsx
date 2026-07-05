"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://laby.app.n8n.cloud/webhook/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        alert("Failed to send message");
      }
    } catch {
      alert("Failed to send message");
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Let&apos;s Build Something
            </h1>
            <p className="text-grey-400 text-lg max-w-xl mx-auto">
              Tell us about your business needs and we&apos;ll craft the
              perfect AI solution.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 focus:ring-1 focus:ring-accent-600/10 transition text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 focus:ring-1 focus:ring-accent-600/10 transition text-sm"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 focus:ring-1 focus:ring-accent-600/10 transition text-sm"
                />
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-card text-grey-400 focus:outline-none focus:border-accent-600/30 focus:ring-1 focus:ring-accent-600/10 transition text-sm"
                >
                  <option value="">I&apos;m interested in...</option>
                  <option value="saas">Enterprise SaaS</option>
                  <option value="micro-saas">Micro SaaS</option>
                  <option value="voice">AI Voice Agents</option>
                  <option value="crm">AI-Integrated CRM</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-card text-white placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 focus:ring-1 focus:ring-accent-600/10 transition text-sm resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 rounded-xl bg-accent-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-accent-500 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-card p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">
                  Email
                </p>
                <p className="text-sm text-grey-300">hello@lab-y.ai</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-card p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">
                  Response Time
                </p>
                <p className="text-sm text-grey-300">
                  We typically respond within 24 hours
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-card p-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-accent-400 mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-4 text-sm text-grey-400">
                  <span className="hover:text-accent-400 transition-colors cursor-pointer">LinkedIn</span>
                  <span className="hover:text-accent-400 transition-colors cursor-pointer">X</span>
                  <span className="hover:text-accent-400 transition-colors cursor-pointer">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
