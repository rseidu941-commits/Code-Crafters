import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allow }) {
  const { user } = useAuth();

  // Redirect to login if not authenticated //
  if (!user) return <Navigate to="/login" />;

  if (allow && !allow.includes(user.role)) return <Navigate to="/" />;

  return <Outlet />;
}
