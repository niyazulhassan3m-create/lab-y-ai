"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Expression = "happy" | "neutral" | "thinking" | "surprised";
type Gender = "female" | "male";

const SKIN_TONES = [
  { label: "Fair", value: "#fce4d6", shadow: "#f0c8b0" },
  { label: "Warm", value: "#f5d0b8", shadow: "#e8b898" },
  { label: "Tan", value: "#e8c4a0", shadow: "#d4a880" },
  { label: "Dark", value: "#c4956a", shadow: "#a87a54" },
];

const HAIR_COLORS = [
  { label: "Black", value: "#1a1a2e", highlight: "#2a2a4e" },
  { label: "Brown", value: "#4a2c1a", highlight: "#6b4230" },
  { label: "Burgundy", value: "#5c1420", highlight: "#7B1E2D" },
  { label: "Blonde", value: "#c4a44a", highlight: "#d4b86a" },
];

const OUTFIT_COLORS = [
  { label: "Maroon", value: "#7B1E2D", accent: "#9B2D3E" },
  { label: "Navy", value: "#1a2744", accent: "#2a3a5a" },
  { label: "Charcoal", value: "#333333", accent: "#4a4a4a" },
  { label: "White", value: "#e8e8e8", accent: "#ffffff" },
];

const EXPRESSION_PATHS = {
  neutral: {
    brows: "M38 58 Q42 55 46 58 M54 58 Q58 55 62 58",
    mouth: "M42 74 Q47 72 52 74",
  },
  happy: {
    brows: "M38 56 Q42 53 46 57 M54 57 Q58 53 62 56",
    mouth: "M40 74 Q47 70 54 74",
  },
  thinking: {
    brows: "M38 54 Q42 54 46 56 M54 58 Q58 54 62 54",
    mouth: "M42 76 Q47 75 52 76",
  },
  surprised: {
    brows: "M37 52 Q42 48 47 52 M53 52 Q58 48 63 52",
    mouth: "M41 74 Q47 71 53 74",
  },
};

const MALE_EXPRESSION = {
  neutral: {
    brows: "M36 58 Q42 54 48 58 M52 58 Q58 54 64 58",
    mouth: "M40 76 Q47 74 54 76",
  },
  happy: {
    brows: "M36 56 Q42 52 48 56 M52 56 Q58 52 64 56",
    mouth: "M38 75 Q47 71 56 75",
  },
  thinking: {
    brows: "M36 53 Q42 53 48 56 M52 56 Q58 53 64 53",
    mouth: "M40 78 Q47 77 54 78",
  },
  surprised: {
    brows: "M35 50 Q42 46 49 50 M51 50 Q58 46 65 50",
    mouth: "M39 75 Q47 72 55 75",
  },
};

const GREETINGS = [
  "Vanakkam! Lab Y AI Solutions ku welcome! Unga per enna?",
  "Vanakkam! Lab Y AI Solutions la Yara pesuren. Eppadi help pannanum?",
  "Vanakkam! Products pathi therinjukkalam. Edutha question ketunga!",
];

const MALE_GREETINGS = [
  "Vanakkam! Lab Y AI Solutions ku welcome! Naan Arjun. Ungaluku eppadi help pannanum?",
  "Vanakkam! Naan Arjun. Products, pricing, demo pathi kekalam.",
  "Vanakkam! Edutha question ketunga. Ungaluku help panna ready!",
];

const RESPONSES: Record<string, string> = {
  hi: "Vanakkam! Yara pesuren. Ungaluku eppadi help pannanum?",
  hello: "Vanakkam! Lab Y AI Solutions ku welcome!",
  "unga per enna": "Naan Yara! Lab Y AI Solutions la AI voice agent.",
  product: "We have 6 AI agents: Text, Voice, 3D Avatar, Testing, Analytics, Media.",
  pricing: "Starter ₹2,100/mo, Growth ₹4,200/mo, Professional ₹8,400/mo.",
  demo: "Sure! Contact page la details kudunga, demo arrange pannurom.",
  thanks: "Romba nandri! Ungaluku help panna mudinjadhu santhosham!",
  bye: "Goodbye! Lab Y team ku ungal support romba mukkiyam!",
};

const MALE_RESPONSES: Record<string, string> = {
  hi: "Vanakkam! Naan Arjun. Ungaluku eppadi help pannanum?",
  hello: "Vanakkam! Lab Y AI Solutions ku welcome! Naan Arjun.",
  "unga per enna": "Naan Arjun! Lab Y AI Solutions la AI avatar agent.",
  product: "We have 6 AI agents: Text, Voice, 3D Avatar, Testing, Analytics, Media.",
  pricing: "Starter ₹2,100/mo, Growth ₹4,200/mo, Professional ₹8,400/mo.",
  demo: "Sure! Contact page la details kudunga, demo arrange pannurom.",
  thanks: "Romba nandri! Help panna mudinjadhu santhosham!",
  bye: "Goodbye! Ungal support romba mukkiyam!",
};

function getResponse(input: string, gender: Gender): string {
  const lower = input.toLowerCase().trim();
  const dict = gender === "male" ? MALE_RESPONSES : RESPONSES;
  for (const [key, reply] of Object.entries(dict)) {
    if (lower.includes(key)) return reply;
  }
  return "Sorry, enakku puriyala. Products, pricing, demo — edutha ketunga!";
}

export default function Avatar3D() {
  const [gender, setGender] = useState<Gender>("female");
  const [expression, setExpression] = useState<Expression>("neutral");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [skinTone, setSkinTone] = useState(SKIN_TONES[0]);
  const [hairColor, setHairColor] = useState(HAIR_COLORS[0]);
  const [outfitColor, setOutfitColor] = useState(OUTFIT_COLORS[0]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const avatarRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const blinkTimeout = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const scheduleBlink = () => {
      blinkTimeout.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, 2500 + Math.random() * 3000);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimeout.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  }, []);

  const speak = useCallback((text: string) => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 0.85;
    u.pitch = gender === "male" ? 0.8 : 1.0;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    synth.speak(u);
  }, [gender]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setChat((p) => [...p, { role: "user", text: userMsg }]);
    setExpression("thinking");
    setTimeout(() => {
      const reply = getResponse(userMsg, gender);
      setChat((p) => [...p, { role: "ai", text: reply }]);
      setExpression("happy");
      speak(reply);
      setTimeout(() => setExpression("neutral"), 2000);
    }, 600 + Math.random() * 400);
  }, [input, speak, gender]);

  const handleGreet = useCallback(() => {
    const msgs = gender === "male" ? MALE_GREETINGS : GREETINGS;
    const msg = msgs[greetingIdx % msgs.length];
    setGreetingIdx((i) => i + 1);
    setChat((p) => [...p, { role: "ai", text: msg }]);
    setExpression("happy");
    speak(msg);
    setTimeout(() => setExpression("neutral"), 2500);
  }, [greetingIdx, speak, gender]);

  const eyeOffsetX = (mousePos.x - 0.5) * 4;
  const eyeOffsetY = (mousePos.y - 0.5) * 3;
  const headTiltX = (mousePos.y - 0.5) * -4;
  const headTiltY = (mousePos.x - 0.5) * 4;

  const expr = gender === "male" ? MALE_EXPRESSION[expression] : EXPRESSION_PATHS[expression];
  const avatarName = gender === "male" ? "Arjun" : "Yara";

  const handleGenderSwitch = (g: Gender) => {
    setGender(g);
    setChat([]);
    setExpression("neutral");
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div
          ref={avatarRef}
          onMouseMove={handleMouseMove}
          className="relative rounded-2xl border border-white/5 bg-gradient-to-b from-accent-900/20 to-card overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent pointer-events-none" />

          {/* Gender Toggle */}
          <div className="absolute top-4 right-4 z-10 flex rounded-lg border border-white/5 overflow-hidden bg-black/40">
            {(["female", "male"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => handleGenderSwitch(g)}
                className={`px-3 py-1.5 text-[10px] tracking-wider uppercase font-bold transition-all ${
                  gender === g ? "bg-accent-600 text-white" : "text-grey-500 hover:text-grey-300"
                }`}
              >
                {g === "female" ? "♀ Yara" : "♂ Arjun"}
              </button>
            ))}
          </div>

          <div
            className="relative flex flex-col items-center pt-8 pb-6 transition-transform duration-200 ease-out"
            style={{ transform: `perspective(600px) rotateX(${headTiltX}deg) rotateY(${headTiltY}deg)` }}
          >
            <svg width="200" height="240" viewBox="0 0 200 240" className="drop-shadow-xl">
              <defs>
                <radialGradient id="skin" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor={skinTone.value} />
                  <stop offset="100%" stopColor={skinTone.shadow} />
                </radialGradient>
                <radialGradient id="hairGrad" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor={hairColor.highlight} />
                  <stop offset="100%" stopColor={hairColor.value} />
                </radialGradient>
                <radialGradient id="iris" cx="40%" cy="35%" r="55%">
                  <stop offset="0%" stopColor="#5a3a1a" />
                  <stop offset="60%" stopColor="#3a2210" />
                  <stop offset="100%" stopColor="#1a0e05" />
                </radialGradient>
                <radialGradient id="lips" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e08080" />
                  <stop offset="100%" stopColor="#c06060" />
                </radialGradient>
                <linearGradient id="outfitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={outfitColor.accent} />
                  <stop offset="100%" stopColor={outfitColor.value} />
                </linearGradient>
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
                </filter>
              </defs>

              {gender === "female" ? (
                <>
                  {/* Female Hair */}
                  <ellipse cx="100" cy="88" rx="52" ry="50" fill="url(#hairGrad)" />
                  <ellipse cx="75" cy="95" rx="20" ry="38" fill="url(#hairGrad)" />
                  <ellipse cx="125" cy="95" rx="20" ry="38" fill="url(#hairGrad)" />
                  <path d="M62 70 Q58 50 70 40 Q80 30 100 28 Q120 30 130 40 Q142 50 138 70" fill="none" stroke={hairColor.highlight} strokeWidth="1" opacity="0.3" />

                  {/* Female Face */}
                  <ellipse cx="100" cy="105" rx="44" ry="48" fill="url(#skin)" />
                  <ellipse cx="54" cy="100" rx="6" ry="12" fill={skinTone.shadow} />
                  <ellipse cx="146" cy="100" rx="6" ry="12" fill={skinTone.shadow} />

                  {/* Eyebrows */}
                  <g fill="none" stroke={hairColor.value} strokeWidth="2.2" strokeLinecap="round">
                    <path d={expr.brows} />
                  </g>

                  {/* Eyes */}
                  <ellipse cx="42" cy="62" rx="8" ry="6" fill="#f8f8f8" />
                  <ellipse cx="58" cy="62" rx="8" ry="6" fill="#f8f8f8" />
                  <circle cx={42 + eyeOffsetX * 0.5} cy={62 + eyeOffsetY * 0.3} r="4.5" fill="url(#iris)" />
                  <circle cx={58 + eyeOffsetX * 0.5} cy={62 + eyeOffsetY * 0.3} r="4.5" fill="url(#iris)" />
                  <circle cx={42 + eyeOffsetX * 0.7} cy={62 + eyeOffsetY * 0.5} r="2.2" fill="#0a0a0a" />
                  <circle cx={58 + eyeOffsetX * 0.7} cy={62 + eyeOffsetY * 0.5} r="2.2" fill="#0a0a0a" />
                  <circle cx={43 + eyeOffsetX * 0.5} cy={61 + eyeOffsetY * 0.3} r="1.5" fill="white" opacity="0.9" />
                  <circle cx={59 + eyeOffsetX * 0.5} cy={61 + eyeOffsetY * 0.3} r="1.5" fill="white" opacity="0.9" />
                  <path d="M34 60 Q36 57 40 58" fill="none" stroke="#1a0a05" strokeWidth="0.8" opacity="0.4" />
                  <path d="M60 58 Q64 57 66 60" fill="none" stroke="#1a0a05" strokeWidth="0.8" opacity="0.4" />

                  {/* Blink overlay */}
                  {isBlinking && (
                    <g>
                      <rect x="34" y="56" width="16" height="12" rx="1" fill={skinTone.shadow} opacity="0.7" />
                      <rect x="50" y="56" width="16" height="12" rx="1" fill={skinTone.shadow} opacity="0.7" />
                    </g>
                  )}

                  {/* Nose */}
                  <path d="M100 66 Q98 76 96 80 Q93 84 96 86 Q100 87 104 86 Q107 84 104 80 Q102 76 100 66" fill="none" stroke={skinTone.shadow} strokeWidth="1.2" opacity="0.4" />

                  {/* Blush */}
                  <ellipse cx="34" cy="74" rx="6" ry="3" fill="#e07070" opacity={expression === "happy" ? 0.15 : 0.06} />
                  <ellipse cx="166" cy="74" rx="6" ry="3" fill="#e07070" opacity={expression === "happy" ? 0.15 : 0.06} />

                  {/* Mouth */}
                  <g fill="none" stroke="url(#lips)" strokeWidth="2.2" strokeLinecap="round">
                    <path d={expr.mouth} />
                  </g>
                  <path d="M44 76 Q50 78 56 76" fill="none" stroke={skinTone.shadow} strokeWidth="0.6" opacity="0.2" />

                  {/* Chin */}
                  <path d="M90 147 Q100 152 110 147" fill="none" stroke={skinTone.shadow} strokeWidth="0.8" opacity="0.15" />

                  {/* Neck */}
                  <rect x="86" y="150" width="28" height="16" rx="4" fill={skinTone.shadow} opacity="0.5" />

                  {/* Female Collar / Outfit */}
                  <g filter="url(#softShadow)">
                    <path d="M62 164 L85 156 L100 170 L115 156 L138 164 L140 200 L60 200 Z" fill="url(#outfitGrad)" />
                    <path d="M85 156 L92 168 M115 156 L108 168" fill="none" stroke={outfitColor.accent} strokeWidth="0.5" opacity={outfitColor.label === "White" ? "0.3" : "0.5"} />
                  </g>
                </>
              ) : (
                <>
                  {/* Male Hair - shorter, more angular */}
                  <ellipse cx="100" cy="84" rx="50" ry="42" fill="url(#hairGrad)" />
                  <ellipse cx="78" cy="90" rx="16" ry="32" fill="url(#hairGrad)" />
                  <ellipse cx="122" cy="90" rx="16" ry="32" fill="url(#hairGrad)" />
                  <path d="M65 68 Q60 52 75 44 Q88 36 100 34 Q112 36 125 44 Q140 52 135 68" fill="none" stroke={hairColor.highlight} strokeWidth="0.8" opacity="0.25" />

                  {/* Male Face - broader jaw */}
                  <path d="M56 70 Q56 60 70 55 Q85 48 100 46 Q115 48 130 55 Q144 60 144 70 L145 115 Q145 135 135 145 Q125 155 100 157 Q75 155 65 145 Q55 135 55 115 Z" fill="url(#skin)" />
                  <ellipse cx="54" cy="100" rx="5" ry="10" fill={skinTone.shadow} />
                  <ellipse cx="146" cy="100" rx="5" ry="10" fill={skinTone.shadow} />
                  {/* Jawline definition */}
                  <path d="M60 115 Q60 135 70 145 Q80 152 100 155 Q120 152 130 145 Q140 135 140 115" fill="none" stroke={skinTone.shadow} strokeWidth="0.8" opacity="0.2" />

                  {/* Eyebrows - thicker, straighter */}
                  <g fill="none" stroke={hairColor.value} strokeWidth="2.8" strokeLinecap="round">
                    <path d={expr.brows} />
                  </g>

                  {/* Eyes - slightly narrower */}
                  <ellipse cx="42" cy="62" rx="7" ry="5" fill="#f8f8f8" />
                  <ellipse cx="58" cy="62" rx="7" ry="5" fill="#f8f8f8" />
                  <circle cx={42 + eyeOffsetX * 0.5} cy={62 + eyeOffsetY * 0.3} r="4" fill="url(#iris)" />
                  <circle cx={58 + eyeOffsetX * 0.5} cy={62 + eyeOffsetY * 0.3} r="4" fill="url(#iris)" />
                  <circle cx={42 + eyeOffsetX * 0.7} cy={62 + eyeOffsetY * 0.5} r="2" fill="#0a0a0a" />
                  <circle cx={58 + eyeOffsetX * 0.7} cy={62 + eyeOffsetY * 0.5} r="2" fill="#0a0a0a" />
                  <circle cx={43 + eyeOffsetX * 0.5} cy={61 + eyeOffsetY * 0.3} r="1.2" fill="white" opacity="0.8" />
                  <circle cx={59 + eyeOffsetX * 0.5} cy={61 + eyeOffsetY * 0.3} r="1.2" fill="white" opacity="0.8" />

                  {/* Blink overlay */}
                  {isBlinking && (
                    <g>
                      <rect x="35" y="57" width="14" height="10" rx="1" fill={skinTone.shadow} opacity="0.7" />
                      <rect x="51" y="57" width="14" height="10" rx="1" fill={skinTone.shadow} opacity="0.7" />
                    </g>
                  )}

                  {/* Male Nose - stronger */}
                  <path d="M100 64 Q97 76 94 82 Q91 88 96 90 Q100 91 104 90 Q109 88 106 82 Q103 76 100 64" fill="none" stroke={skinTone.shadow} strokeWidth="1.5" opacity="0.45" />

                  {/* Mouth */}
                  <g fill="none" stroke="url(#lips)" strokeWidth="2" strokeLinecap="round">
                    <path d={expr.mouth} />
                  </g>

                  {/* Neck - thicker */}
                  <rect x="84" y="152" width="32" height="16" rx="4" fill={skinTone.shadow} opacity="0.5" />

                  {/* Adam's apple hint */}
                  <ellipse cx="100" cy="162" rx="4" ry="3" fill={skinTone.shadow} opacity="0.25" />

                  {/* Male Collar / Outfit - shirt style */}
                  <g filter="url(#softShadow)">
                    <path d="M58 164 L82 155 L100 168 L118 155 L142 164 L144 200 L56 200 Z" fill="url(#outfitGrad)" />
                    {/* Collar */}
                    <path d="M82 155 L90 170 M118 155 L110 170" fill="none" stroke={outfitColor.accent} strokeWidth="1.2" opacity={outfitColor.label === "White" ? "0.3" : "0.6"} />
                    {/* Tie / shirt line */}
                    <line x1="100" y1="168" x2="100" y2="195" stroke={outfitColor.accent} strokeWidth="1.5" opacity="0.4" />
                  </g>
                </>
              )}

              {/* Speaking indicator */}
              {isSpeaking && (
                <g>
                  <circle cx="160" cy="90" r="3" fill="#d64b5a" opacity="0.6">
                    <animate attributeName="r" values="2;4;2" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="170" cy="95" r="2.5" fill="#d64b5a" opacity="0.4">
                    <animate attributeName="r" values="1.5;3.5;1.5" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="178" cy="92" r="2" fill="#d64b5a" opacity="0.3">
                    <animate attributeName="r" values="1;3;1" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.05;0.3" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </svg>

            {/* Name + Status */}
            <div className="text-center mt-2">
              <p className="text-lg font-bold">{avatarName}</p>
              <p className={`text-[10px] tracking-wider uppercase ${isSpeaking ? "text-accent-400" : "text-grey-500"}`}>
                {isSpeaking ? "Speaking..." : expression === "thinking" ? "Thinking..." : "AI Avatar"}
              </p>
            </div>

            {/* Expression Buttons */}
            <div className="flex gap-2 mt-4">
              {(["happy", "neutral", "thinking", "surprised"] as Expression[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setExpression(e)}
                  className={`w-8 h-8 rounded-full text-xs transition-all ${
                    expression === e
                      ? "bg-accent-600 text-white scale-110"
                      : "bg-white/5 text-grey-400 hover:bg-white/10"
                  }`}
                  title={e}
                >
                  {e === "happy" ? "😊" : e === "neutral" ? "😐" : e === "thinking" ? "🤔" : "😮"}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button onClick={handleGreet} disabled={isSpeaking} className="px-4 py-2 rounded-lg bg-accent-600 text-white text-[10px] font-bold tracking-wider uppercase hover:bg-accent-500 disabled:opacity-40 transition-all">
                👋 Greet Me
              </button>
              <button onClick={() => setShowCustomizer(!showCustomizer)} className="px-4 py-2 rounded-lg border border-white/10 text-grey-300 text-[10px] font-bold tracking-wider uppercase hover:bg-white/5 transition-all">
                🎨 Customize
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-80">
        <div className="rounded-2xl border border-white/5 bg-card/80 backdrop-blur-sm h-full flex flex-col">
          <div className="p-4 border-b border-white/5">
            <p className="text-[11px] tracking-wider uppercase text-grey-500">Chat with {avatarName}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
            {chat.length === 0 && (
              <div className="text-center py-8">
                <p className="text-grey-500 text-sm">Ask anything in Tanglish!</p>
                <p className="text-grey-600 text-xs mt-1">Or click 👋 Greet Me button</p>
              </div>
            )}
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent-600/20 border border-accent-600/20 text-white"
                    : "bg-white/5 border border-white/5 text-grey-200"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type in Tanglish..."
                className="flex-1 px-3 py-2 rounded-lg border border-white/5 bg-black/40 text-white text-xs placeholder:text-grey-600 focus:outline-none focus:border-accent-600/30"
              />
              <button onClick={handleSend} disabled={!input.trim()} className="px-3 py-2 rounded-lg bg-accent-600 text-white disabled:opacity-40 hover:bg-accent-500 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customizer Panel */}
      {showCustomizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCustomizer(false)}>
          <div className="rounded-2xl border border-white/5 bg-card p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] tracking-wider uppercase text-grey-300">Customize {avatarName}</p>
              <button onClick={() => setShowCustomizer(false)} className="text-grey-500 hover:text-white">&times;</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] tracking-wider uppercase text-grey-500 mb-2">Skin Tone</p>
                <div className="flex gap-2">
                  {SKIN_TONES.map((s) => (
                    <button key={s.label} onClick={() => setSkinTone(s)} className={`w-8 h-8 rounded-full border-2 transition-all ${skinTone.label === s.label ? "border-accent-500 scale-110" : "border-transparent"}`} style={{ backgroundColor: s.value }} title={s.label} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-wider uppercase text-grey-500 mb-2">Hair Color</p>
                <div className="flex gap-2">
                  {HAIR_COLORS.map((h) => (
                    <button key={h.label} onClick={() => setHairColor(h)} className={`w-8 h-8 rounded-full border-2 transition-all ${hairColor.label === h.label ? "border-accent-500 scale-110" : "border-transparent"}`} style={{ backgroundColor: h.value }} title={h.label} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-wider uppercase text-grey-500 mb-2">Outfit</p>
                <div className="flex gap-2">
                  {OUTFIT_COLORS.map((o) => (
                    <button key={o.label} onClick={() => setOutfitColor(o)} className={`w-8 h-8 rounded-full border-2 transition-all ${outfitColor.label === o.label ? "border-accent-500 scale-110" : "border-transparent"}`} style={{ backgroundColor: o.value }} title={o.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
