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

    const contextBlock = context
      ? `
The person also asked a specific question or shared something on their mind:
"${context}"

IMPORTANT: You must directly address this question or topic within the reading. Weave your response to it naturally into the horoscope. Do not ignore it or give a generic reading that could apply to anyone. Speak to the specific situation, feelings, or question they raised.
`
      : "";

    const prompt = `
You are writing a WEEKLY horoscope reading.

Person:
${person}

Focus:
${focus}
${contextBlock}
Requirements:
Write a weekly horoscope reading.

---

TONE:
- Warm and nurturing, like a trusted friend who also happens to be wise.
- Honest and direct. Don't sugarcoat or hedge. Say what needs to be said with kindness.
- Grounded and calm. Not airy or vague.
- Intimate. Write as if speaking to one person, not an audience.
- Slightly poetic in places, but never at the expense of clarity.
- Never anxious, preachy, or condescending.

---

STRUCTURE:
1. Open with 2-3 paragraphs of prose (the core reading).
   - Lead with a feeling, image, or observation, not a summary.
   - Build around one central emotional or psychological theme for the week.
   - Let the theme emerge through the writing rather than naming it outright.
2. End with a short section of 3-5 bullet points.
   - Use a simple header like "This week" or "Keep close this week" or something similarly understated.
   - Each bullet should be one concise line.
   - Mix of: small practical actions, things to pay attention to, emotional nudges, and gentle reflective prompts.
   - Examples of good bullets:
     - "Notice what makes you exhale this week. Do more of that."
     - "That conversation you've been replaying? It might be worth revisiting out loud."
     - "Let yourself be slow on Tuesday or Wednesday. Not everything needs momentum."
     - "Pay attention to what irritates you. It's pointing at something you care about."

---

CONTENT GUIDANCE:
- Speak to inner experience: emotions, instincts, tensions, quiet realizations.
- Reference real-life moments: conversations, decisions, the feeling of waking up on a particular morning, a moment of hesitation before speaking.
- Include the body when relevant: tension in the chest, restlessness, a deep breath, the urge to move or be still.
- Touch on relationships and connection: not just romantic, but friendships, family, coworkers, the relationship with oneself.
- Mention energy and rhythm: is the week fast or slow? building or releasing? heavy or light?
- Acknowledge what might be hard without spiraling into negativity.
- If something is ending or shifting, name it gently.
- Include a sense of timing or pacing: early week vs. late week, a turning point midweek, a weekend exhale.
- Avoid astrology jargon, clichés, zodiac stereotypes, and absolute predictions.
- Never say "the universe," "the stars," or "cosmic energy."
- No em dashes. No overly stylized punctuation.

---

LENGTH:
- Prose section: approximately 160-200 words.
- Bullet section: 3-5 bullets, each one line.
- Total: approximately 200-260 words.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return new Response(
      JSON.stringify({ text: response.choices[0].message.content }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Server error" }),
      { status: 500 }
    );
  }
}
