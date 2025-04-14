import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function rewriteText(req, res) {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Missing input text" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一個幫忙潤飾文字的助手，請將使用者的內容改寫得更通順自然。" },
        { role: "user", content: text },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error("❌ AI error", err);
    res.status(500).json({ error: "AI request failed" });
  }
}
