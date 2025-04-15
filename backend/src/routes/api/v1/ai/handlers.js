import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_TOKEN);

export async function rewriteText(req, res) {
  const { prompt, emotion, character } = req.body;

  if (!prompt || !emotion || !character) {
    return res.status(400).json({ error: "Missing prompt, emotion, or character" });
  }

  const fullPrompt = `Please reply concisely in the tone of a ${emotion} ${character}: ${prompt}`;

  const result = await client.chatCompletion({
    model: "HuggingFaceH4/zephyr-7b-beta",
    provider: "hf-inference",
    messages: [{ role: "user", content: fullPrompt }],
    temperature: 0.9,
    top_p: 0.95,
    max_tokens: 30,
  });

  const reply = result.choices?.[0]?.message?.content || "⚠️ No response.";
  return res.json({ result: reply });
}
