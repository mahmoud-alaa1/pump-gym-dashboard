import { Outlet, useNavigate } from "react-router";
import useAuth from "../modules/auth/store/useAuth";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    navigate("/login");
  }
  return <Outlet />;
}
