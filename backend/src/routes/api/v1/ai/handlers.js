// backend/src/routes/api/v1/ai/handlers.js

import fetch from 'node-fetch';
//import dotenv from 'dotenv';
//dotenv.config();

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_API_URL = 'https://api-inference.huggingface.co/models/eugenesiow/bart-paraphrase';

export async function rewriteText(req, res) {
  try {
    const inputText = req.body.text;
    if (!inputText) {
      return res.status(400).json({ error: 'No input text provided' });
    }

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: inputText })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('❌ Hugging Face error:', err);
      return res.status(500).json({ error: 'AI request failed', detail: err });
    }

    const data = await response.json();
    const rewritten = data[0]?.generated_text || '⚠️ AI response malformed.';
    return res.json({ rewritten });
  } catch (error) {
    console.error('❌ Internal error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
