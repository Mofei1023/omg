import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,  // ✅ 把原本的 "/api/v1" 改成部署友善版本
  withCredentials: true,         // ✅ 若有用 session/cookie 建議加上
});

export default api;
