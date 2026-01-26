import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sign, question, context } = await req.json();

    if (!sign || !question) {
      return new Response(
        JSON.stringify({ error: "Missing sign or question" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const person =
      sign === "scorpio"
        ? "♏ Scorpio (Oct 27, 1994, 6:58 PM — Fayetteville, Arkansas)"
        : "♐ Sagittarius (Nov 29, 1994, 11:00 AM — Montoursville, Pennsylvania)";

    const focus =
      question === "shaping"
        ? "Focus on the forces and themes shaping the week."
        : question === "air"
        ? "Focus on the emotional and energetic atmosphere of the week."
        : "Focus on what the week is asking of the person — invitation + lesson.";

    const prompt = `
You are writing a WEEKLY horoscope reading.

Person:
${person}

Focus:
${focus}

Optional context:
${context || "(none)"}

Requirements:
- 180–240 words.
- Calm, reflective, slightly magical.
- No astrology jargon.
- No clichés or absolutes.
- Mention early-week and late-week energy.
- End with a section titled "Ways to move through the week".
- EXACTLY 3 concrete, actionable bullet points.
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return new Response(
      JSON.stringify({ text: response.output_text }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Server error" }),
      { status: 500 }
    );
  }
}
