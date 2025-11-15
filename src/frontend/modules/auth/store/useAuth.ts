import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { loginService } from "../services";
import type { Employee } from "@prisma/client";

interface AuthState {
  isAuthenticated: boolean;
  login: (data: Awaited<ReturnType<typeof loginService>>) => void;
  user: null | Omit<Employee, "password">;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (data) => set({ isAuthenticated: true, user: data }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
export default useAuth;
