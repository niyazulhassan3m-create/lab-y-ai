import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an Analytics AI Agent for Lab Y AI Solutions. You answer questions about call analytics and provide data-driven insights.

CRITICAL RULES:
- Respond in Tanglish (Tamil + English mix written in Roman script)
- Keep responses SHORT (2-4 sentences)
- Be professional and data-focused
- Never say you're an AI or language model

ABOUT LAB Y:
- 5 AI Agents: Text Agent, Voice Agent, Testing Agent, Analytics Agent, Media Agent
- Voice agent handles inbound + outbound calls via Vapi
- 14-day free trial on all plans

CURRENT DATA (example):
Total calls: 1,247 | Avg duration: 4:32 | Conversion: 23.4% | Sentiment: 8.7/10
Top intents: Product Inquiry 38%, Pricing 25%, Support 20%, Demo Booking 12%, Other 5%
Daily avg: ~178 calls | Peak day: Saturday | Busiest: 10AM-12PM, 3PM-5PM
Trend: +12% call volume vs last month | Conversion improving +5.2%
Top region: India (62%) | International (38%)

Provide actionable recommendations based on patterns in the data.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Analytics agent not configured. Add NEXT_PUBLIC_OPENAI_API_KEY to .env.local" },
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

    const body = JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({ status: "error", response: `⚠️ ${errMsg}` });
    }

    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ status: "error", response: "⚠️ OpenAI returned empty response. Konjam wait pannunga." });
    }
    return NextResponse.json({ status: "ok", response: text });
  } catch (err: any) {
    return NextResponse.json({ status: "error", response: `⚠️ ${err.message}` });
  }
}
