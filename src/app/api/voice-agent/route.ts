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

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Voice agent not configured. Add NEXT_PUBLIC_OPENAI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m: any) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.error?.message || "OpenAI API error";
      console.error("OpenAI API error:", errMsg);
      return NextResponse.json({ response: `⚠️ API Error: ${errMsg}` });
    }

    const text = data?.choices?.[0]?.message?.content?.trim() || "Sorry, enakku puriyala. Konjam wait pannunga.";
    return NextResponse.json({ response: text });
  } catch (err: any) {
    console.error("Voice agent error:", err.message);
    return NextResponse.json({ response: `⚠️ Server Error: ${err.message}` });
  }
}
