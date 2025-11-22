import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/login-page";
import ProtectedRoutes from "./components/protected-routes";
import AuthRoutes from "./components/auth-routes";
import Providers from "./providers";
import ClientsPage from "./pages/clients-page";
import NotFoundPage from "./pages/not-found";
import MainLayout from "./layouts/MainLayout";
import EmployeesPage from "./pages/employees-page";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/clients" replace />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
