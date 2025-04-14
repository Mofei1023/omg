// frontend/src/services/ai.js
import api from "./axiosClient";

export const ai = {
  rewrite: ({ prompt, emotion, character }) =>
    api.post("/api/v1/ai/rewrite", { prompt, emotion, character }),
};
