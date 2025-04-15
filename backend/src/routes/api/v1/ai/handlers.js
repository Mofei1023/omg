import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_TOKEN);

export async function rewriteText(req, res) {
  const { prompt, emotion, character } = req.body;

  if (!prompt || !emotion || !character) {
    return res.status(400).json({ error: "Missing prompt, emotion, or character" });
  }

  const fullPrompt = `Please reply in the tone of a ${emotion} ${character}: ${prompt}`;

  // 試 OpenRouter (openchat-7b)
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://omg-9scg.onrender.com",
        "X-Title": "AlpacaAI CHAT"
      },
      body: JSON.stringify({
        model: "agentica-org/deepcoder-14b-preview:free",
        messages: [
          { role: "user", content: fullPrompt }
        ],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 200
      })
    });

    const data = await response.json();
    console.log(data)
    const reply = data.choices?.[0]?.message?.content || "⚠️ OPEN No response.";
    return res.json({ result: reply });
  } catch (orErr) {
    // fallback: Hugging Face
    try {
      const result = await client.chatCompletion({
        model: "HuggingFaceH4/zephyr-7b-beta",
        provider: "hf-inference",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 100,
      });

      const reply = result.choices?.[0]?.message?.content || "⚠️ HF No response.";
      return res.json({ result: reply });
    } catch (hfErr) {
      return res.status(500).json({ error: "Both models failed to respond." });
    }
  }
}
