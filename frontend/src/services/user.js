// frontend/src/services/user.js
import api from "./axiosClient";

export const user = {
  async createOne(data, csrfToken) {
    const res = await api.post("/users", data, {
      headers: {
        "x-csrf-token": csrfToken,
      },
      withCredentials: true,
    });
    return res.data;
  },
};
