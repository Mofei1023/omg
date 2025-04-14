//frontend/src/services/comment.js
import api from "./axiosClient";

export const comment = {
  getAll: async () => {
    const res = await api.get("/comments");
    return res.data;
  },
  create: async (data, csrfToken) => {
    const res = await api.post("/comments", data, {
      headers: {
        "x-csrf-token": csrfToken,
      },
      withCredentials: true,
    });
    return res.data;
  },
  remove: async (id, csrfToken) => {
    const res = await api.delete(`/comments/${id}`, {
      headers: {
        "x-csrf-token": csrfToken,
      },
      withCredentials: true,
    });
    return res.data;
  },
};
