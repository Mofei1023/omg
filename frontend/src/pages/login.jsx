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
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Login
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
                className="mb-3 relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              />
              <input
                name="pwd"
                type="password"
                required
                placeholder="Password"
                value={formData.pwd}
                onChange={handleTextInputChange}
                className="mb-3 relative block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-400" />
              </span>
              Login
            </button>
          </form>
          <pre>{message}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {userdata.image && (
        <img src={userdata.image} alt="user" className="mb-4 w-32 h-32 rounded-full mx-auto" />
      )}
      <h3 className="text-xl font-bold text-center">Username: {userdata.username}</h3>
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Login;
