import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../services";
import bg from "./images/ethan.jpg";

function CreateUserPage() {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const suspiciousPattern = /<[^>]*script|onerror\s*=|<img|<iframe|<svg|<object/i;

  const handleTextInputChange = ({ target: { name, value } }) => {
    if (suspiciousPattern.test(value)) {
      setMessage("⚠️ 請勿輸入可疑的 HTML 或 JavaScript 內容。系統已紀錄。");
      //console.warn("🚨 XSS attempt detected in register form:", value);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const resizedImg = resizeImage(img, 100, 100);
      setImage(JSON.stringify(resizedImg));
    };

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    if (file) reader.readAsDataURL(file);
  };

  const resizeImage = (image, maxw, maxh) => {
    const canvas = document.createElement("canvas");
    const ratio = Math.min(maxw / image.width, maxh / image.height);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { csrfToken } = await services.auth.getCsrf(); // ✅ CSRF
      const data = await services.user.createOne(
        {
          name: formData.username,
          pwd: formData.pwd,
          img: image,
        },
        csrfToken // ✅ 傳入 token
      );

      //console.log("✅ Create 成功", data);
      setMessage("✅ 註冊成功！");
      setFormData({ username: "", pwd: "" });
      setImage("");
      navigate("/about");
    } catch (err) {
      //console.error("❌ 註冊失敗", err);
      setMessage("❌ 註冊失敗，請檢查 console 或 API 狀態");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-sm text-gray-600">請輸入資料以完成註冊</p>
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
            type="text"
            placeholder="Password"
            value={formData.pwd}
            onChange={handleTextInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="img"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handlePicChange}
            className="block w-full text-sm text-gray-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Register
          </button>
        </form>
        <pre className="text-center text-red-500 mt-4">{message}</pre>
      </div>
    </div>
  );
}

export default CreateUserPage;
