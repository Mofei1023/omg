import axiosClient from './axiosClient';

export function sendRewritePrompt({ prompt, emotion, character }) {
  return axiosClient.post('/api/v1/ai/rewrite', {
    prompt,
    emotion,
    character
  });
}
