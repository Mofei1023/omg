import fetch from 'node-fetch';

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

export async function rewriteText(req, res) {
  try {
    const { prompt, emotion, character } = req.body;
    if (!prompt || !emotion || !character) {
      return res.status(400).json({ error: 'Missing prompt, emotion, or character' });
    }

    // 包裝 prompt，讓語氣跟角色明確
    const wrappedPrompt = `Please reply this in a ${emotion} tone of a ${character}: ${prompt}`;

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: wrappedPrompt,
        parameters: {
          temperature: 0.9,
          top_p: 0.95,
          do_sample: true,
          max_new_tokens: 100
        }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('❌ Hugging Face error:', err);
      return res.status(500).json({ error: 'AI request failed', detail: err });
    }

    const data = await response.json();
    const rewrittenRaw = data[0]?.generated_text || '⚠️ AI response malformed.';
    const rewritten = rewrittenRaw.replace(wrappedPrompt, '').trim();
    return res.json({ result: rewritten });
  } catch (error) {
    console.error('❌ Internal error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
