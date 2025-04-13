import api from "./axiosClient";

export const comment = {
  getAll: async () => {
    const res = await api.get("/comments");
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/comments", data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
  },
};
