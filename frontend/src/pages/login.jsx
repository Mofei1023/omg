import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import services from "../services";

function Login() {
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const [islogin, setLogin] = useState(false);
  const [userdata, setUserdata] = useState({
    username: "",
    pwd: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const getname = localStorage.getItem("callname");
    const getpwd = localStorage.getItem("callpwd");
    const getimg = localStorage.getItem("callimg");

    let imageParsed = "";
    try {
      imageParsed = JSON.parse(getimg);
    } catch (e) {
      imageParsed = "";
    }

    if (token) {
      setLogin(true);
      setUserdata({
        username: getname,
        pwd: getpwd,
        image: imageParsed,
      });
    }
  }, []);

  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await services.auth.login(formData);

    const token = localStorage.getItem("jwtToken");
    const getname = localStorage.getItem("callname");
    const getpwd = localStorage.getItem("callpwd");
    const getimg = localStorage.getItem("callimg");

    let imageParsed = "";
    try {
      imageParsed = JSON.parse(getimg);
    } catch (e) {
      imageParsed = "";
    }

    if (token) {
      setLogin(true);
      setUserdata({
        username: getname,
        pwd: getpwd,
        image: imageParsed,
      });
    } else {
      setMessage("❌ Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setUserdata({ username: "", pwd: "", image: "" });
  };

  if (!islogin) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-white items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-xl">
          <div className="text-center mb-6">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500">Please log in to your account</p>
          </div>
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleTextInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="pwd"
                type="password"
                required
                value={formData.pwd}
                onChange={handleTextInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none"
              >
                <LockClosedIcon className="w-5 h-5" />
                Login
              </button>
            </div>
          </form>
          <pre className="mt-3 text-sm text-red-600 text-center">{message}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50 px-6 py-12">
      {userdata.image && (
        <img
          src={userdata.image}
          alt="user"
          className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
        />
      )}
      <h3 className="text-2xl font-bold mb-2">Hello, {userdata.username} 👋</h3>
      <button
        onClick={handleLogout}
        className="mt-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Login;
