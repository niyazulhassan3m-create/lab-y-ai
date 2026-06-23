"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Tab = "call" | "browser" | "chat";

const VAPI_CONFIGURED = !!(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY && process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
const OPENAI_CONFIGURED = !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 India" },
  { code: "+1", label: "🇺🇸 US/Canada" },
  { code: "+44", label: "🇬🇧 UK" },
  { code: "+61", label: "🇦🇺 Australia" },
  { code: "+65", label: "🇸🇬 Singapore" },
  { code: "+971", label: "🇦🇪 UAE" },
  { code: "+60", label: "🇲🇾 Malaysia" },
  { code: "+94", label: "🇱🇰 Sri Lanka" },
];

export default function VoiceAgent() {
  const [tab, setTab] = useState<Tab>("browser");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "ended">("idle");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [thinking, setThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typeText, setTypeText] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [vapiReady, setVapiReady] = useState(false);
  const [fieldReady, setFieldReady] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const vapiRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef(transcript);
  const chatRef = useRef(chat);
  const statusRef = useRef(callStatus);
  transcriptRef.current = transcript;
  chatRef.current = chat;
  statusRef.current = callStatus;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const initVapi = useCallback(async () => {
    if (!VAPI_CONFIGURED) return;
    try {
      const Vapi = (await import("@vapi-ai/web")).default;
      const instance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      instance.on("call-start", () => setCallStatus("connected"));
      instance.on("call-end", () => { setCallStatus("ended"); setSpeaking(false); });
      instance.on("speech-start", () => setSpeaking(true));
      instance.on("speech-end", () => setSpeaking(false));
      instance.on("message", (msg: any) => {
        if (msg.type === "transcript" && msg.transcript) {
          setChat((prev) => [...prev, { role: msg.role === "user" ? "user" : "ai", text: msg.transcript }]);
        }
      });
      instance.on("error", () => setCallStatus("ended"));
      vapiRef.current = instance;
      setFieldReady(true);
    } catch { setFieldReady(false); }
  }, []);

  useEffect(() => { initVapi(); return () => { vapiRef.current?.stop(); }; }, [initVapi]);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const load = () => {
      const voices = synthRef.current?.getVoices() || [];
      const v = voices.find((x) => /india|heera|hindi/i.test(x.name))
        || voices.find((x) => x.lang === "en-IN")
        || voices.find((x) => /google uk female|samantha|zira/i.test(x.name))
        || voices.find((x) => x.lang.startsWith("en"))
        || voices[0];
      if (v) (window as any).__yaraVoice = v;
      setVoiceReady(true);
    };
    load();
    if (synthRef.current) synthRef.current.onvoiceschanged = load;
  }, []);

  const speak = useCallback((text: string) => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = (window as any).__yaraVoice;
    if (v) u.voice = v;
    u.lang = "en-IN";
    u.rate = 0.85;
    u.pitch = 1.0;
    u.onstart = () => setSpeaking(true);
    u.onend = () => { setSpeaking(false); };
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  }, []);

  const queryAI = useCallback(async (text: string) => {
    setThinking(true);
    try {
      const res = await fetch("/api/voice-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: chatRef.current }),
      });
      const data = await res.json();
      const reply = data.response || data.error || "Sorry, enakku puriyala. Konjam wait pannunga.";
      setChat((prev) => [...prev, { role: "ai", text: reply }]);
      setThinking(false);
      if (tab === "browser") speak(reply);
    } catch (e: any) {
      const msg = `⚠️ Error: ${e.message}`;
      setChat((prev) => [...prev, { role: "ai", text: msg }]);
      setThinking(false);
      if (tab === "browser") speak("Konjam technical issue. Wait pannunga.");
    }
  }, [speak, tab]);

  const processInput = useCallback((text: string) => {
    if (!text.trim() || !OPENAI_CONFIGURED) return;
    setTranscript("");
    setChat((prev) => [...prev, { role: "user", text }]);
    queryAI(text);
  }, [queryAI]);

  const startListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false;
    r.interimResults = true;
    r.lang = "ta-IN";
    r.onstart = () => setListening(true);
    r.onresult = (e: any) => { setTranscript(e.results[e.resultIndex][0].transcript); };
    r.onerror = () => setListening(false);
    r.onend = () => { setListening(false); if (transcriptRef.current.trim()) processInput(transcriptRef.current); };
    recognitionRef.current = r;
    r.start();
  }, [processInput]);

  const stopListening = useCallback(() => { recognitionRef.current?.stop(); setListening(false); }, []);

  const startVapiCall = () => { if (vapiRef.current && process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID) { setCallStatus("calling"); vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID); } };
  const endVapiCall = () => { vapiRef.current?.stop(); };

  const handleTypeSend = () => { if (typeText.trim()) { processInput(typeText); setTypeText(""); } };

  const needsSetup = !VAPI_CONFIGURED && !OPENAI_CONFIGURED;

  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-accent-900/20 to-card overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {([["call", "call"], ["browser", "browser"], ["chat", "chat"]] as [Tab, string][]).map(([key]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-[11px] font-medium tracking-wide transition-all ${
              tab === key
                ? "text-accent-400 border-b-2 border-accent-600 bg-accent-600/5"
                : "text-grey-500 hover:text-grey-300"
            } ${key === "call" && !VAPI_CONFIGURED ? "opacity-40 cursor-not-allowed" : ""}`}
            disabled={key === "call" && !VAPI_CONFIGURED}
          >
            {key === "call" ? <><img src="https://images.unsplash.com/photo-1552581234-26160f608093?w=80&q=80&auto=format&fit=crop" className="w-4 h-4 rounded object-cover inline-block mr-1.5 -mt-0.5" /> Call Agent</> : key === "browser" ? <><img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=80&q=80&auto=format&fit=crop" className="w-4 h-4 rounded object-cover inline-block mr-1.5 -mt-0.5" /> Browser Agent</> : <><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&q=80&auto=format&fit=crop" className="w-4 h-4 rounded object-cover inline-block mr-1.5 -mt-0.5" /> Text Chat</>}
          </button>
        ))}
      </div>

      {needsSetup && (
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-accent-600/10 flex items-center justify-center mx-auto mb-4">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&q=80&auto=format&fit=crop" alt="Setup" className="w-8 h-8 rounded object-cover" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Setup Required</h3>
          <p className="text-grey-400 text-sm mb-4">Set up at least one option in <code className="text-accent-300 px-1 bg-white/5 rounded">.env.local</code>:</p>
          <div className="text-left max-w-lg mx-auto space-y-3 mb-4">
            <div className="bg-black/40 rounded-xl p-3">
              <p className="text-[11px] text-grey-500 mb-1">Free — Browser/Text Agent:</p>
              <code className="text-[12px] text-accent-300">NEXT_PUBLIC_OPENAI_API_KEY=sk-...</code>
            </div>
            <div className="bg-black/40 rounded-xl p-3">
              <p className="text-[11px] text-grey-500 mb-1">Premium — Real Phone Calls:</p>
              <code className="text-[12px] text-accent-300 block">NEXT_PUBLIC_VAPI_PUBLIC_KEY=...</code>
              <code className="text-[12px] text-accent-300 block">NEXT_PUBLIC_VAPI_ASSISTANT_ID=...</code>
            </div>
          </div>
          <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-accent-400 text-sm hover:underline">
            Get your OpenAI key →
          </a>
        </div>
      )}

      {!needsSetup && (
        <>
          {/* Call Agent Tab */}
          {tab === "call" && VAPI_CONFIGURED && (
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <defs>
                    <radialGradient id="cs" cx="50%" cy="45%" r="50%">
                      <stop offset="0%" stopColor="#fce4d6" /><stop offset="100%" stopColor="#f5d0b8" />
                    </radialGradient>
                    <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3D0D14" /><stop offset="100%" stopColor="#5C1420" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="40" cy="32" rx="26" ry="24" fill="url(#ch)" />
                  <ellipse cx="16" cy="34" rx="10" ry="18" fill="url(#ch)" />
                  <ellipse cx="64" cy="34" rx="10" ry="18" fill="url(#ch)" />
                  <ellipse cx="40" cy="38" rx="22" ry="20" fill="url(#cs)" />
                  <ellipse cx="33" cy="36" rx="3.5" ry="4" fill="#2d1218" />
                  <ellipse cx="47" cy="36" rx="3.5" ry="4" fill="#2d1218" />
                  <circle cx="34.5" cy="34.5" r="1.5" fill="white" opacity="0.8" />
                  <circle cx="48.5" cy="34.5" r="1.5" fill="white" opacity="0.8" />
                  <path d="M35 44 Q40 48 45 44" fill="none" stroke="#9B2D3E" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="54" cy="20" r="4" fill="#d64b5a" />
                </svg>
              </div>
              {callStatus === "idle" && (
                <div className="max-w-md mx-auto">
                  <label className="text-[11px] text-grey-500 mb-2 block text-center">Enter your phone number to receive a call from Yara</label>
                  <div className="flex gap-2 mb-4">
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="px-3 py-2.5 rounded-xl border border-white/5 bg-black/40 text-white text-sm focus:outline-none focus:border-accent-600/30">
                      {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.label} {c.code}</option>)}
                    </select>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Phone number" className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30" />
                  </div>
                  <button onClick={startVapiCall} disabled={phone.length < 6 || !fieldReady} className="w-full py-3 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 disabled:opacity-40 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
                    Call Me
                  </button>
                </div>
              )}
              {callStatus === "calling" && <p className="text-center text-yellow-400 text-sm animate-pulse">Calling your number...</p>}
              {callStatus === "connected" && (
                <div className="text-center">
                  <p className="text-green-400 text-sm mb-4">✅ Connected — Yara is speaking with you</p>
                  <button onClick={endVapiCall} className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm hover:bg-red-500 transition-all">End Call</button>
                </div>
              )}
              {callStatus === "ended" && (
                <div className="text-center">
                  <p className="text-grey-500 text-sm mb-4">Call ended</p>
                  <button onClick={() => { setCallStatus("idle"); setChat([]); }} className="px-6 py-2.5 rounded-xl bg-accent-600 text-white text-sm hover:bg-accent-500 transition-all">New Call</button>
                </div>
              )}
              {chat.length > 0 && (
                <div className="mt-4 border-t border-white/5 pt-4 max-h-[200px] overflow-y-auto space-y-2">
                  {chat.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.role === "user" ? "bg-accent-600/20 border border-accent-600/20 text-white" : "bg-white/5 border border-white/5 text-grey-200"}`}>{m.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Browser Agent Tab */}
          {tab === "browser" && (
            <div className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-3">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <defs>
                      <radialGradient id="bs" cx="50%" cy="45%" r="50%">
                        <stop offset="0%" stopColor="#fce4d6" /><stop offset="100%" stopColor="#f5d0b8" />
                      </radialGradient>
                      <linearGradient id="bh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3D0D14" /><stop offset="100%" stopColor="#5C1420" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="36" cy="28" rx="24" ry="22" fill="url(#bh)" />
                    <ellipse cx="14" cy="30" rx="9" ry="16" fill="url(#bh)" />
                    <ellipse cx="58" cy="30" rx="9" ry="16" fill="url(#bh)" />
                    <ellipse cx="36" cy="34" rx="20" ry="18" fill="url(#bs)" />
                    <ellipse cx="30" cy="32" rx="3" ry="3.5" fill="#2d1218" />
                    <ellipse cx="42" cy="32" rx="3" ry="3.5" fill="#2d1218" />
                    <circle cx="31" cy="30.5" r="1.2" fill="white" opacity="0.8" />
                    <circle cx="43" cy="30.5" r="1.2" fill="white" opacity="0.8" />
                    <path d="M32 39 Q36 42 40 39" fill="none" stroke="#9B2D3E" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="48" cy="18" r="3.5" fill="#d64b5a" />
                    {(speaking || listening) && <circle cx="48" cy="18" r="3.5" fill="none" stroke="#9B2D3E" strokeWidth="0.5" opacity="0.5"><animate attributeName="r" values="3.5;7;3.5" dur="1.5s" repeatCount="indefinite" /></circle>}
                  </svg>
                  {(speaking || listening) && (
                    <div className="absolute -inset-2 rounded-full border-2 border-accent-600/20 animate-ping" />
                  )}
                </div>
                <p className={`text-[11px] font-medium tracking-wide ${listening ? "text-red-400" : speaking ? "text-accent-400" : "text-grey-500"}`}>
                  {listening ? "Listening..." : speaking ? "Speaking..." : "Tap mic to talk in Tanglish"}
                </p>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={listening ? stopListening : startListening}
                  disabled={!OPENAI_CONFIGURED || !voiceReady}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    listening ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse" : "bg-accent-600 text-white shadow-lg shadow-accent-600/30 hover:bg-accent-500 hover:scale-105"
                  } disabled:opacity-40`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>

              {transcript && (
                <div className="mb-3 bg-accent-600/10 border border-accent-600/20 rounded-xl px-4 py-2 text-sm text-accent-300"><img src="https://images.unsplash.com/photo-1552581234-26160f608093?w=80&q=80&auto=format&fit=crop" className="w-3.5 h-3.5 rounded object-cover inline-block mr-1 -mt-0.5" /> {transcript}</div>
              )}

              <div className="max-h-[200px] overflow-y-auto space-y-2 mb-3">
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.role === "user" ? "bg-accent-600/20 border border-accent-600/20 text-white" : "bg-white/5 border border-white/5 text-grey-200"}`}>{m.text}</div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 rounded-xl px-3 py-2.5"><div className="flex gap-1">
                      {[0, 150, 300].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {!OPENAI_CONFIGURED && (
                <p className="text-center text-[11px] text-grey-600">Add <code className="text-accent-300">NEXT_PUBLIC_OPENAI_API_KEY</code> to enable AI</p>
              )}
              <div className="flex gap-2 mt-2">
                <input type="text" value={typeText} onChange={(e) => setTypeText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleTypeSend()} placeholder="Type in Tanglish..." className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30" />
                <button onClick={handleTypeSend} disabled={!typeText.trim()} className="px-4 py-2.5 rounded-xl bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Text Chat Tab */}
          {tab === "chat" && (
            <div className="p-6">
              <div className="max-h-[300px] overflow-y-auto space-y-3 mb-4">
                {chat.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-grey-500 text-sm">Ask me anything about Lab Y in Tanglish!</p>
                    <p className="text-grey-600 text-xs mt-1">Try: "Unga AI voice agent pathi sollunga"</p>
                  </div>
                )}
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-accent-600/20 border border-accent-600/20 text-white rounded-br-md" : "bg-white/5 border border-white/5 text-grey-200 rounded-bl-md"}`}>{m.text}</div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 rounded-xl px-4 py-3"><div className="flex gap-1">
                      {[0, 150, 300].map((d) => <span key={d} className="w-2 h-2 rounded-full bg-grey-500 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2">
                <input type="text" value={typeText} onChange={(e) => setTypeText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleTypeSend()} placeholder={OPENAI_CONFIGURED ? "Type your message..." : "Add API key to chat..."} disabled={!OPENAI_CONFIGURED} className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-black/40 text-white text-sm placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30 disabled:opacity-40" />
                <button onClick={handleTypeSend} disabled={!typeText.trim() || !OPENAI_CONFIGURED} className="px-5 py-3 rounded-xl bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
              {!OPENAI_CONFIGURED && <p className="text-center text-[11px] text-grey-600 mt-3">Add <code className="text-accent-300">NEXT_PUBLIC_OPENAI_API_KEY</code> to .env.local</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
