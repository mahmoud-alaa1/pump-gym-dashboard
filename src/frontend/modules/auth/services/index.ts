import { callService } from "@/frontend/lib/utils";
import type { loginSchema } from "../schemas";
import type { Employee } from "@prisma/client";

export async function loginService(data: loginSchema) {
  return callService<Omit<Employee, "password">>(() =>
    window.electron.login(data)
  );
}
