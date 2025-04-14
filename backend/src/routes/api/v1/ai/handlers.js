// 1️⃣ 安裝 openai SDK（終端機）
// npm install openai  

// 2️⃣ src/routes/api/v1/ai/handlers.js
import { Configuration, OpenAIApi } from "openai";
//import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function rewriteText(req, res) {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: "Missing input text" });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant who rewrites text in a more polished and concise way.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const rewritten = completion.data.choices[0].message.content.trim();
    res.json({ rewritten });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "AI rewrite failed." });
  }
}
