import { handleServiceError } from "@/frontend/errors/AppError";
import type { loginSchema } from "../schemas";

export async function loginService(data: loginSchema) {
  try {
    const res = await window.electron.login(data);
    console.log(res);
    return res;
  } catch (err) {
    throw handleServiceError(err);
  }
}
