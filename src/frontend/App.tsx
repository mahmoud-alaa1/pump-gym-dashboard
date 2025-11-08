import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/login-page";
import ProtectedRoutes from "./components/protected-routes";
import AuthRoutes from "./components/auth-routes";
import Providers from "./providers";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
