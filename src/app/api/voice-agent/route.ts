import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Yara, an AI voice agent for Lab Y AI Solutions. You ANSWER INCOMING CALLS from potential customers.

CRITICAL RULES:
- Speak ONLY in Tanglish (Tamil + English mix written in Roman script)
- Keep responses SHORT (2-3 sentences max) — this is a voice conversation
- Be warm, professional, and helpful
- Never say you're an AI or language model — you are Yara

ABOUT LAB Y:
- AI Agents: Text Agent (chatbots), Voice Agent (calls), Testing Agent, Analytics Agent, Media Agent
- Pricing: Starter ₹2,100/mo, Growth ₹4,200/mo, Professional ₹8,400/mo, Enterprise custom
- 14-day free trial on all plans
- Contact: hello@lab-y.ai or contact page for demos

GREETING (first message only):
Vanakkam! Lab Y AI Solutions ku welcome! Naan Yara pesuren. Ungaluku eppadi help pannanum? Products, pricing, demo — edutha ketunga.

FAREWELL (when user says bye/thanks/nandri):
Romba nandri! Ungaluku help panna mudinjadhu santhosham. Demo book pannanum na contact page la reach out pannunga. Goodbye!`;

function fallbackReply(msg: string): string {
  const q = msg.toLowerCase();
  if (q.includes("hi") || q.includes("vanakkam") || q.includes("hello") || q.includes("hey")) return "Vanakkam! Naan Yara, Lab Y AI Solutions la AI agent. Ungaluku eppadi help pannanum? Products, pricing, demo — edhavadhu ketunga!";
  if (q.includes("pricing") || q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("vila")) return "Our pricing: Starter plan ₹2,100/mo, Growth ₹4,200/mo, Professional ₹8,400/mo. Enterprise plan custom. 14-day free trial available! Entha plan pathi details venum?";
  if (q.includes("demo") || q.includes("book") || q.includes("appointment") || q.includes("meeting")) return "Sure! Ungaluku demo book panna contact page ku ponga — lab-y-ai.vercel.app/contact. Atho illa namma sales team ku ping pannala?";
  if (q.includes("service") || q.includes("product") || q.includes("offer") || q.includes("enna")) return "We have 5 AI Agents: Text Agent (chatbots), Voice Agent (calls), Testing Agent (QA), Analytics Agent (insights), Media Agent (content). Ethula ungaluku interest?";
  if (q.includes("voice") || q.includes("call")) return "Our Voice Agent handles real phone calls using Vapi technology. It answers in Tanglish, captures leads, and transfers to humans when needed. Browser la um test pannalam!";
  if (q.includes("text") || q.includes("chat") || q.includes("bot")) return "Text Agent websites, WhatsApp, Instagram, Facebook la integrate aagum. 24/7 Tanglish la lead capture pannum. Unga website la use panna ready!";
  if (q.includes("analytics") || q.includes("anal")) return "Analytics Agent tracks all calls and conversations — sentiment analysis, intent detection, conversion tracking, daily AI briefings. Data-driven decisions edukka help pannum!";
  if (q.includes("media") || q.includes("image") || q.includes("video") || q.includes("content")) return "Media Agent generates marketing visuals, social media posts, logos, videos from text prompts. AI-powered content creation for your brand!";
  if (q.includes("testing") || q.includes("qa") || q.includes("test")) return "Testing Agent automates QA with AI-powered test generation, cross-browser testing, visual regression, and bug reporting. QA time 80% reduce pannum!";
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone")) return "Contact us at hello@lab-y.ai or visit lab-y-ai.vercel.app/contact. Quick demo book pannalam!";
  if (q.includes("trial") || q.includes("free") || q.includes("start")) return "14-day free trial on all plans! No credit card needed. Start panna lab-y-ai.vercel.app/contact la reach out pannunga!";
  if (q.includes("bye") || q.includes("thanks") || q.includes("thank") || q.includes("nandri") || q.includes("okay") || q.includes("ok")) return "Romba nandri! Ungaluku help panna mudinja santhosham. Demo book pannanum na contact page la reach out pannunga. Goodbye!";
  return "Sorry, konjam clarify pannunga! Products, pricing, demo — edhavadhu specifically ketunga, naan help pannren!";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        status: "ok",
        response: `Vanakkam! Naan Yara. Lab Y AI Solutions la AI agent. Ungaluku eppadi help pannanum?\n\nWe offer 5 AI Agents:\n🔹 Text Agent — Chatbots for websites & social media\n🔹 Voice Agent — Real phone calls in Tanglish\n🔹 Testing Agent — Automated QA\n🔹 Analytics Agent — Call insights & sentiment\n🔹 Media Agent — AI content generation\n\n14-day free trial! Enna help venum?`
      });
    }

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am Yara, the Tanglish-speaking voice agent for Lab Y AI Solutions. I will follow all rules strictly." }] },
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ status: "ok", response: fallbackReply(message) });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return NextResponse.json({ status: "ok", response: text || fallbackReply(message) });
  } catch {
    return NextResponse.json({ status: "ok", response: "Konjam technical issue! Wait panni re-type pannunga." });
  }
}
