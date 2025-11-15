import { Outlet, useNavigate } from "react-router";
import useAuth from "../modules/auth/store/useAuth";

export default function AuthRoutes() {
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth.isAuthenticated) {
    navigate("/clients");
  }
  return <Outlet />;
}
