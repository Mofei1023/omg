import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import services from "../services";
import bg from "./images/ethan.jpg"; // ✅ 請確認路徑正確

function Login() {
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const [islogin, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setLogin(true);
    }
  }, []);

  const suspiciousPattern = /<[^>]*script|onerror\s*=|<img|<iframe|<svg|<object/i;

  const handleTextInputChange = ({ target: { name, value } }) => {
    if (suspiciousPattern.test(value)) {
      setMessage("⚠️ 請勿輸入可疑的 HTML 或 JavaScript 內容。系統已紀錄。");
      console.warn("🚨 XSS attempt detected in login form:", value);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const user = await services.auth.login(formData); // ✅ 已內建取得 CSRF Token 並帶 headers

    if (user && user.id) {
      setLogin(true);
      localStorage.setItem("callname", user.name);
      localStorage.setItem("callpwd", user.pwd);
      localStorage.setItem("callimg", user.img || "");

      window.dispatchEvent(new Event("storage")); // ✅ 通知 RootLayout 更新 sidebar
      navigate("/profile"); // ✅ 登入成功後導向 Profile 頁面
    } else {
      setMessage("❌ Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">Please log in to your account</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleTextInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="pwd"
            type="password"
            placeholder="Password"
            value={formData.pwd}
            onChange={handleTextInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Login
          </button>
        </form>
        <pre className="text-center text-red-500 mt-4">{message}</pre>
      </div>
    </div>
  );
}

export default Login;