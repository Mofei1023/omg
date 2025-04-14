// frontend/src/services/ai.js
import api from "./axiosClient";
import { auth } from "./auth"; // ✅ 確保有引入

export const ai = {
  async rewrite({ prompt, emotion, character }) {
    const { csrfToken } = await auth.getCsrf(); // ✅ 取得 token

    const { data } = await api.post(
      "/ai/rewrite",
      { prompt, emotion, character },
      {
        headers: { "x-csrf-token": csrfToken },
        withCredentials: true, // ✅ 確保 cookie 被送出
      }
    );

    return data;
  },
};
