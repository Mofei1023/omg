import { user } from "./user.js";
import { auth } from "./auth.js";
import { comment } from "./comment.js"; // ✅ 加這行
import api from "./axiosClient";

const services = {
  auth,
  user,
  comment, // ✅ 加這行
};

api.interceptors.request.use(
  async (config) => {
    const { csrfToken } = await auth.getCsrf();
    config.headers["x-csrf-token"] = csrfToken;
    return config;
  },
  null,
  {
    runWhen: (config) =>
      ["post", "put", "patch", "delete"].includes(config.method),
  }
);

export default services;
