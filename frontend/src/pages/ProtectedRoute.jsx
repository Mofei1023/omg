// frontend/src/pages/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    alert("⛔ 請先登入！");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
