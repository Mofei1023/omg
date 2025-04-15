//frontend/src/services/axiosClient.js
import axios from "axios";

// ✅ 建議加 fallback 預防部署錯誤
const API_URL = import.meta.env.VITE_API_URL || "https://omg-9scg.onrender.com";

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,  // ✅ 更靈活支援本地與雲端部署
  withCredentials: true,         // ✅ 必須攜帶 cookie 才能讓 CSRF token 有效
});

// ✅ 全域攔截器：若未來你要統一處理錯誤或自動加入 token，可以從這裡擴展
// api.interceptors.request.use(config => {
//   // ex: config.headers.Authorization = `Bearer ${localStorage.getItem("jwtToken")}`;
//   return config;
// });

export default api;
