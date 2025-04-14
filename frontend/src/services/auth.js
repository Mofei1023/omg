//frontend/src/services/auth.js
import api from "./axiosClient";

export const auth = {
  // 🔐 取得 CSRF token（會帶上 cookie，必要！）
  async getCsrf() {
    try {
      const {
        data: { csrfToken },
      } = await api.get("/users/csrf-token", { withCredentials: true });
      return { csrfToken };
    } catch (error) {
      console.error("❌ Failed to get CSRF token", error);
      return { csrfToken: "" };
    }
  },

  // 🔐 安全的登入流程
  async login(formData) {
    try {
      const { csrfToken } = await auth.getCsrf(); // 先取得 CSRF token

      const {
        data: { user, token },
      } = await api.post("/users/login", formData, {
        headers: {
          "x-csrf-token": csrfToken,
        },
        withCredentials: true,
      });

      // ✅ 儲存登入者資訊
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("callid", user.id);
      localStorage.setItem("callname", user.name);
      localStorage.setItem("callpwd", user.pwd);
      localStorage.setItem("callimg", user.img);

      return user;
    } catch (e) {
      console.error("❌ Login error:", e);
      return e.response?.data || { error: "Login failed" };
    }
  },
};
