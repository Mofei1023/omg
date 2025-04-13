import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import services from "../services";

function Login() {
  const [formData, setFormData] = useState({ username: "", pwd: "" });
  const [message, setMessage] = useState("");
  const [islogin, setlogin] = useState("");
  const [userdata, setuserdata] = useState({ username: "", pwd: "", image: "" });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const getname = localStorage.getItem("callname");
    const getpwd = localStorage.getItem("callpwd");
    const getimg = localStorage.getItem("callimg");

    if (token) {
      setlogin(token);
      setuserdata({
        username: getname,
        pwd: getpwd,
        image: getimg,
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

    setlogin(!!token);
    setuserdata({
      username: getname,
      pwd: getpwd,
      image: getimg,
    });

    if (data.error) {
      setMessage(data.error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setlogin("");
    setuserdata({ username: "", pwd: "", image: "" });
  };

  if (!islogin) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
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
              Login
            </button>
          </form>
          <pre>{message}</pre>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center mt-10">
        {userdata.image && (
          <img
            src={userdata.image}
            alt="User Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "0 auto",
              objectFit: "cover",
            }}
          />
        )}
        <h3 className="text-2xl font-bold mt-4">Username: {userdata.username}</h3>
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Login;
