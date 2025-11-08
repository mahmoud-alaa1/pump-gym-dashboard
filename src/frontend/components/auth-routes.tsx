import { Outlet, useNavigate } from "react-router";

export default function AuthRoutes() {
  const navigate = useNavigate();
  if (true) {
    navigate("/");
  }
  return <Outlet />;
}
