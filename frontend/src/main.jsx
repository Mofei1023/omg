import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { RootIndex } from "./pages";
import About from "./pages/about";
import "./index.css";
//import UserPage from "./pages/users";
import CreateUserPage from "./pages/create-user";
import ErrorPage from "./pages/error-page";
import Login from "./pages/login";
import Comment from "./pages/comment";
import AIRewrite from "./pages/airewrite";
import Profile from "./pages/profile";

// ✅ 新增 import：防護元件
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RootIndex /> },
      { path: "/about", element: <About /> },
      //{ path: "/users", element: <UserPage /> },
      { path: "/create-user", element: <CreateUserPage /> },
      { path: "/login", element: <Login /> },
      {
        path: "/profile",
        element: <Profile />,
      },

      // ✅ 用 ProtectedRoute 包住需要登入的頁面
      {
        path: "/comment",
        element: (
          <ProtectedRoute>
            <Comment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/airewrite",
        element: (
          <ProtectedRoute>
            <AIRewrite />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
