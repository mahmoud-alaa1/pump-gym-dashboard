import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services";
import { toast } from "sonner";
import type { AppError } from "@/frontend/errors/AppError";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router";

export default function useLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      auth.login(data);
      navigate("/clients");
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error: AppError) => {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
}
