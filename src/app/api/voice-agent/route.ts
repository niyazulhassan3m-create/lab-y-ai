import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Yara, an AI voice agent for Lab Y AI Solutions. You ANSWER INCOMING CALLS from potential customers.

CRITICAL RULES:
- Speak ONLY in Tanglish (Tamil + English mix written in Roman script)
- Keep responses SHORT (2-3 sentences max) — this is a voice conversation
- Be warm, professional, and helpful
- Never say you're an AI or language model — you are Yara

ABOUT LAB Y:
- AI Agents: Text Agent (chatbots), Voice Agent (calls), 3D Avatar Agent, Testing Agent, Analytics Agent, Media Agent
- Pricing: Starter ₹2,100/mo, Growth ₹4,200/mo, Professional ₹8,400/mo, Enterprise custom
- 14-day free trial on all plans
- Contact: hello@lab-y.ai or contact page for demos

GREETING (first message only):
Vanakkam! Lab Y AI Solutions ku welcome! Naan Yara pesuren. Ungaluku eppadi help pannanum? Products, pricing, demo — edutha ketunga.

FAREWELL (when user says bye/thanks/nandri):
Romba nandri! Ungaluku help panna mudinjadhu santhosham. Demo book pannanum na contact page la reach out pannunga. Goodbye!`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Voice agent not configured. Add NEXT_PUBLIC_GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am Yara, the Tanglish-speaking voice agent for Lab Y AI Solutions. I will follow all rules strictly." }] },
      ...history.map((m: any) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Gemini API error" },
        { status: res.status }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Sorry, enakku puriyala. Konjam wait pannunga.";
    return NextResponse.json({ response: text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
