import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `You are GENIE AI, a friendly and knowledgeable assistant for the GENIE Connect community platform focused on gender equality.

Your role:
- Answer questions about gender equality, pay gaps, workplace inclusion, women's rights, diversity policies, and related topics.
- Give concise, helpful answers (2-4 sentences max unless the user asks for more detail).
- Be supportive and encouraging.
- If a question is completely unrelated to gender equality or community topics, gently redirect them.

Keep your tone warm but professional. No markdown formatting — just plain text.`;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 },
    );
  }

  const { question } = await req.json();

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: question.trim() }] }],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Gemini API error:", res.status, errBody);
      return NextResponse.json(
        { error: "AI service is temporarily unavailable" },
        { status: 502 },
      );
    }

    const data = await res.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate an answer. Please try again.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
