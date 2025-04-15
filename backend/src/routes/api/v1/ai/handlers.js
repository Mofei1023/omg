import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_TOKEN);

export async function rewriteText(req, res) {
  const { prompt, emotion, character } = req.body;

  if (!prompt || !emotion || !character) {
    return res.status(400).json({ error: "Missing prompt, emotion, or character" });
  }

  const fullPrompt = `Please reply in the tone of a ${emotion} ${character}: ${prompt}`;

  // 試 OpenRouter (deepcoder-14b-preview:free)
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
        model: "openchat/openchat-7b",
        messages: [
          { role: "user", content: fullPrompt }
        ],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 80
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content;
    if (reply) {
      return res.json({ result: reply });
    } else {
      console.warn("⚠️ OpenRouter 回傳格式不完整，啟動 fallback");
      throw new Error("OpenRouter gave no valid content");
    }
  } catch (orErr) {
    console.warn("⚠️ OpenRouter 錯誤：", orErr.message);

    // fallback: Hugging Face
    try {
      const result = await client.chatCompletion({
        model: "HuggingFaceH4/zephyr-7b-beta",
        provider: "hf-inference",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 80
      });

      const reply = result.choices?.[0]?.message?.content || "⚠️ HF No response.";
      return res.json({ result: reply });
    } catch (hfErr) {
      console.error("❌ Hugging Face fallback 也失敗：", hfErr.message);
      return res.status(500).json({ error: "Both models failed to respond." });
    }
  }
}
