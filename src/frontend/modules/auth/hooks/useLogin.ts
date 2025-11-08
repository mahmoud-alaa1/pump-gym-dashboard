import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services";
import { toast } from "sonner";
import type { AppError } from "@/frontend/errors/AppError";

export default function useLogin() {
  return useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error: AppError) => {
      console.error(error);
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
}
