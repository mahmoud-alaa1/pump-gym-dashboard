import { Outlet, useNavigate } from "react-router";
import useAuth from "../modules/auth/store/useAuth";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const auth = useAuth();

  // useEffect(() => {
  //   if (!auth.isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [auth.isAuthenticated, navigate]);

  return <Outlet />;
}
