import { auth } from "./auth"; // 確保有匯入 auth 模組

export const comment = {
  getAll: async () => {
    const res = await api.get("/comments");
    return res.data;
  },

  create: async (data) => {
    const { csrfToken } = await auth.getCsrf();
    const res = await api.post("/comments", data, {
      headers: { "x-csrf-token": csrfToken },
      withCredentials: true,
    });
    return res.data;
  },

  remove: async (id) => {
    const { csrfToken } = await auth.getCsrf();
    const res = await api.delete(`/comments/${id}`, {
      headers: { "x-csrf-token": csrfToken },
      withCredentials: true,
    });
    return res.data;
  },
};
