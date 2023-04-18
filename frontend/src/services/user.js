import api from "./axiosClient";

export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ name, pwd }) {
    const { data } = await api.post("/users", { name, pwd});
    return data;
  },
};
