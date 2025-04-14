import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../services";

function CreateUserPage() {
  const [image, setImage] = useState(""); // base64 字串
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const suspiciousPattern = /<[^>]*script|onerror\s*=|<img|<iframe|<svg|<object/i;
  // 處理文字欄位變動
  const handleTextInputChange = ({ target: { name, value } }) => {
    if (suspiciousPattern.test(value)) {
      setMessage("⚠️ 請勿輸入可疑的 HTML 或 JavaScript 內容。系統已紀錄。");
      console.warn("🚨 XSS attempt detected in register form:", value);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 處理圖片上傳 + 壓縮
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const resizedImg = resizeImage(img, 100, 100);
      // ⛔ 要 stringify 才能安全存入 DB！
      setImage(JSON.stringify(resizedImg));
    };

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 圖片壓縮函數
  const resizeImage = (image, maxw, maxh) => {
    const canvas = document.createElement("canvas");
    const ratio = Math.min(maxw / image.width, maxh / image.height);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  };

  // 提交表單
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await services.user.createOne({
        name: formData.username,
        pwd: formData.pwd,
        img: image, // ✅ 是 JSON.stringify 過後的 base64 字串
      });

      console.log("✅ Create 成功", data);
      setMessage("✅ 註冊成功！");
      setFormData({ username: "", pwd: "" });
      setImage("");
      navigate("/users"); // 導回列表
    } catch (err) {
      console.error("❌ 註冊失敗", err);
      setMessage("❌ 註冊失敗，請檢查 console 或 API 狀態");
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Create an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <input
                name="username"
                type="text"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleTextInputChange}
                className="mb-3 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300"
              />
              <input
                name="pwd"
                type="text"
                required
                placeholder="Password"
                value={formData.pwd}
                onChange={handleTextInputChange}
                className="mb-3 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300"
              />
              <input
                name="img"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handlePicChange}
              />
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-400" />
              </span>
              Create
            </button>
          </form>
          <pre>{message}</pre>
        </div>
      </div>
    </>
  );
}

export default CreateUserPage;
