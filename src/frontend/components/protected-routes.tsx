import { Outlet, useNavigate } from "react-router";

export default function ProtectedRoutes() {
  const navigate = useNavigate();

  if (true) {
    navigate("/login");
  }
  return <Outlet />;
}
