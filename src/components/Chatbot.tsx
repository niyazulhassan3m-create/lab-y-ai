"use client";

import { useState, useRef, useEffect } from "react";

const responses: Record<string, string> = {
  hello:
    "Hi there! I'm Yara, your AI assistant. How can I help you today? 😊",
  services:
    "We offer 6 AI services:\n\n💬 Text Agent — Chatbots for websites & social media\n🎙️ Voice Agent — Real phone calls in Tanglish\n🧪 Testing Agent — Automated QA at scale\n📊 Analytics Agent — Ad & performance insights\n🎨 Media Agent — AI content & image generation\n🌐 Website Developing — Custom AI-integrated websites\n\nWhich one interests you?",
  pricing:
    "Our pricing starts at ₹2,100/month for Starter, ₹4,200/month for Growth, and ₹8,400/month for Professional. Enterprise plan custom. 14-day free trial on all plans! 🚀",
  demo:
    "I'd love to show you a demo! We have interactive demos for all 6 AI services. Head to our Demos page or let me know which one you'd like to see!",
  contact:
    "You can reach us at hello@lab-y.ai or use the Contact form on our site. We typically respond within 24 hours! 📬",
  voice:
    "Our AI Voice Agents handle sales calls, customer support, and scheduling with human-like conversation in Tanglish. Supports Vapi real phone calls and browser voice! 🎙️",
  analytics:
    "Analytics Agent tracks ad performance, call insights, sentiment analysis, and conversion data. AI-powered reports and recommendations in Tanglish! 📊",
  media:
    "Media Agent generates marketing visuals, social posts, logos, and videos from text prompts. AI-powered content creation for your brand! 🎨",
  testing:
    "Testing Agent automates QA with AI test generation, cross-browser testing, visual regression, and bug reporting. QA time 80% reduce pannum! 🧪",
  textagent:
    "Text Agent integrates with websites, WhatsApp, Instagram & Facebook. 24/7 lead capture and Tanglish conversation. Deploy in minutes! 💬",
  website:
    "Website Developing — naama ungaluku custom AI-integrated website build panni kuduppom! AI features like chatbots, voice agents, analytics dashboards ellam include. Unga requirements describe panna, full site deliver pannuvom! 🌐",
  default:
    "That's a great question! Let me connect you with our team for a detailed answer. Meanwhile, you can check our Services page or book a demo! 😊",
};

const quickReplies = [
  { key: "services", label: "Your Services" },
  { key: "demo", label: "Book a Demo" },
  { key: "pricing", label: "Pricing" },
  { key: "contact", label: "Contact" },
];

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: responses.hello, isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (text: string) => {
    const q = text.toLowerCase().trim();
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInput("");
    setShowQuick(false);
    setTyping(true);

    setTimeout(() => {
      let reply = responses.default;
      if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
        reply = responses.hello;
      else if (q.includes("service") || q.includes("product") || q.includes("offer"))
        reply = responses.services;
      else if (q.includes("pric") || q.includes("cost") || q.includes("plan"))
        reply = responses.pricing;
      else if (q.includes("demo") || q.includes("see") || q.includes("show"))
        reply = responses.demo;
      else if (q.includes("contact") || q.includes("email") || q.includes("reach"))
        reply = responses.contact;
      else if (q.includes("voice") || q.includes("call"))
        reply = responses.voice;
      else if (q.includes("analytics") || q.includes("insight"))
        reply = responses.analytics;
      else if (q.includes("media") || q.includes("image") || q.includes("video") || q.includes("content"))
        reply = responses.media;
      else if (q.includes("test") || q.includes("qa"))
        reply = responses.testing;
      else if (q.includes("text") || q.includes("chat") || q.includes("whatsapp") || q.includes("bot"))
        reply = responses.textagent;
      else if (q.includes("website") || q.includes("site") || q.includes("web") || q.includes("landing"))
        reply = responses.website;

      setMessages((prev) => [...prev, { text: reply, isUser: false }]);
      setTyping(false);
      setShowQuick(true);
    }, 1200);
  };

  const handleQuickReply = (key: string) => {
    const labels: Record<string, string> = {
      services: "Tell me about your services",
      demo: "I'd like to book a demo",
      pricing: "What are your pricing plans?",
      contact: "How can I contact you?",
    };
    handleSend(labels[key]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-600/40 hover:shadow-accent-500/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="56" height="56" viewBox="0 0 56 56" className="drop-shadow-lg">
            <defs>
              <radialGradient id="iconSkin" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#fce4d6" />
                <stop offset="100%" stopColor="#f5d0b8" />
              </radialGradient>
              <linearGradient id="iconHair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3D0D14" />
                <stop offset="100%" stopColor="#5C1420" />
              </linearGradient>
            </defs>
            {/* Glow ring */}
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
              <animate attributeName="r" values="25;27;25" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Hair base */}
            <ellipse cx="28" cy="24" rx="20" ry="18" fill="url(#iconHair)" />
            <ellipse cx="12" cy="26" rx="7" ry="14" fill="url(#iconHair)" />
            <ellipse cx="44" cy="26" rx="7" ry="14" fill="url(#iconHair)" />
            {/* Face */}
            <ellipse cx="28" cy="29" rx="15" ry="14" fill="url(#iconSkin)" />
            {/* Eyes with blink */}
            <g>
              <ellipse cx="22" cy="28" rx="2.8" ry="3.2" fill="#2d1218">
                <animate attributeName="ry" values="3.2;0.2;3.2" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;0.06" />
                <animate attributeName="rx" values="2.8;0.2;2.8" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;0.06" />
              </ellipse>
              <ellipse cx="34" cy="28" rx="2.8" ry="3.2" fill="#2d1218">
                <animate attributeName="ry" values="3.2;0.2;3.2" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;0.06" />
                <animate attributeName="rx" values="2.8;0.2;2.8" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;0.06" />
              </ellipse>
              {/* Eye sparkle */}
              <circle cx="23" cy="27" r="1" fill="white" opacity="0.8" />
              <circle cx="35" cy="27" r="1" fill="white" opacity="0.8" />
            </g>
            {/* Blush */}
            <ellipse cx="18" cy="33" rx="4" ry="2" fill="#e07070" opacity="0.15" />
            <ellipse cx="38" cy="33" rx="4" ry="2" fill="#e07070" opacity="0.15" />
            {/* Smile */}
            <path d="M24 34 Q28 37.5 32 34" fill="none" stroke="#9B2D3E" strokeWidth="1.2" strokeLinecap="round" />
            {/* Hair clip */}
            <circle cx="37" cy="14" r="3" fill="#d64b5a" />
            <circle cx="37" cy="14" r="3" fill="url(#iconHair)" opacity="0.3" />
            {/* Sparkle */}
            <g opacity="0.6">
              <circle cx="10" cy="16" r="1.2" fill="#d64b5a">
                <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="46" cy="38" r="1" fill="#d64b5a">
                <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "600px", height: "calc(100vh - 200px)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5">
          <div className="relative shrink-0">
            {/* Avatar */}
            <svg width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <radialGradient id="skin" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fce4d6" />
                  <stop offset="100%" stopColor="#f5d0b8" />
                </radialGradient>
              </defs>
              {/* Hair */}
              <ellipse cx="20" cy="18" rx="16" ry="14" fill="#3D0D14" />
              <ellipse cx="8" cy="20" rx="5" ry="12" fill="#3D0D14" />
              <ellipse cx="32" cy="20" rx="5" ry="12" fill="#3D0D14" />
              {/* Face */}
              <ellipse cx="20" cy="22" rx="12" ry="11" fill="url(#skin)" />
              {/* Eyes */}
              <g>
                <ellipse cx="15" cy="21" rx="2.2" ry="2.5" fill="#2d1218" />
                <ellipse cx="25" cy="21" rx="2.2" ry="2.5" fill="#2d1218" />
                <ellipse cx="15.5" cy="20.5" rx="0.8" ry="0.8" fill="white" opacity="0.8" />
                <ellipse cx="25.5" cy="20.5" rx="0.8" ry="0.8" fill="white" opacity="0.8" />
              </g>
              {/* Blush */}
              <ellipse cx="12" cy="25" rx="3" ry="1.5" fill="#e07070" opacity="0.2" />
              <ellipse cx="28" cy="25" rx="3" ry="1.5" fill="#e07070" opacity="0.2" />
              {/* Mouth */}
              <path d="M17 26.5 Q20 28.5 23 26.5" fill="none" stroke="#9B2D3E" strokeWidth="0.8" strokeLinecap="round" />
              {/* Hair clip */}
              <circle cx="28" cy="10" r="2.5" fill="#d64b5a" />
            </svg>
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
          </div>
          <div>
            <p className="text-sm font-semibold">Yara</p>
            <p className="text-[10px] text-green-400 font-medium tracking-wide">Online</p>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto p-1 text-grey-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "calc(100% - 120px)" }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.isUser
                    ? "bg-accent-600 text-white rounded-br-md"
                    : "bg-white/5 text-grey-200 rounded-bl-md"
                }`}
              >
                {m.text.split("\n").map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          {showQuick && !typing && messages.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr.key}
                  onClick={() => handleQuickReply(qr.key)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-grey-300 font-medium tracking-wide hover:border-accent-600/30 hover:text-accent-400 transition-all"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && handleSend(input)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 transition"
            />
            <button
              onClick={() => input.trim() && handleSend(input)}
              disabled={!input.trim()}
              className="px-3 py-2.5 rounded-xl bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
