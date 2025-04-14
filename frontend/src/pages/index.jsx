import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import alpacaLogo from "./images/alpaca.jpg";
import menuIcon from "./images/menu.png"; // ✅ 記得放 menu.png 到 images 資料夾


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const location = useLocation();

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("jwtToken"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [location]);

  const navigation = isLoggedIn
    ? [
        { name: "About", href: "/about" },
        {name: "Profile", href:"/profile"},
        { name: "Comment", href: "/comment" },
        { name: "AIChat", href: "/airewrite" },
      ]
    : [
        { name: "About", href: "/about" },
        { name: "Register", href: "/create-user" },
        { name: "Login", href: "/login" },
      ];

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-8 rounded-full lg:hidden"
                      src={alpacaLogo}
                      alt="Alpaca"
                    />
                    <div className="hidden lg:flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={alpacaLogo}
                        alt="Alpaca"
                      />
                      <span className="ml-2 text-white font-bold text-lg">Alpaca's Site</span>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )
                          }
                        >
                          {item.name === "AIRewrite" ? "AIChat" : item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {isLoggedIn && (
                    <div className="flex items-center space-x-2 text-white mr-4">
                      <span className="text-sm font-medium">
                        {localStorage.getItem("callname")}
                      </span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={JSON.parse(localStorage.getItem("callimg") || '""') || alpacaLogo}
                        alt="user"
                      />
                    </div>
                  )}
  
                  {isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition duration-150"
                    >
                      <img
                        src={menuIcon}
                        alt="menu"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              {({ close }) => (
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                      onClick={close}
                    >
                      {item.name === "AIRewrite" ? "AIChat" : item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div>
        <Outlet />
      </div>
    </div>
  );
  
}

export function RootIndex() {
  return <Navigate to="/about" />;
}
