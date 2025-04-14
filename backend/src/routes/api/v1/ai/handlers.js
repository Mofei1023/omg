// backend/src/routes/api/v1/ai/handlers.js
import fetch from 'node-fetch';

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-base';

export async function rewriteText(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const hfResponse = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          temperature: 0.9,
          max_new_tokens: 80
        }
      })
    });

    const data = await hfResponse.json();

    if (!Array.isArray(data)) {
      console.error("❌ AI error", data);
      return res.status(500).json({ error: "AI response format error" });
    }

    const result = data[0]?.generated_text || "(No result returned)";
    res.json({ result });
  } catch (err) {
    console.error("❌ Internal error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
}
