import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../services";

function CreateUserPage() {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    const reader = new FileReader();

    img.onload = () => {
      const resizedImg = resizeImage(img, 100, 100);
      setImage(resizedImg);
    };

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
      const data = await services.user.createOne({
        name: formData.username,
        pwd: formData.pwd,
        img: image, // ✅ 不要 JSON.stringify()
      });

      console.log("✅ Create 成功", data);
      setMessage("✅ Create 成功！");
      setFormData({ username: "", pwd: "" });
      setImage("");
      navigate("/users");
    } catch (err) {
      console.error("❌ Create 失敗", err);
      setMessage("❌ Create 失敗，請檢查 API 或 Console 錯誤");
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
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <input
                name="username"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-3"
                placeholder="Username"
                value={formData.username}
                onChange={handleTextInputChange}
              />
              <input
                name="pwd"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-3"
                placeholder="Password"
                value={formData.pwd}
                onChange={handleTextInputChange}
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
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
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
