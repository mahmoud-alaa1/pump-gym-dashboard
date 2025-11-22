import { useMutation } from "@tanstack/react-query";
import { addEmployeeService } from "../services";
import { toast } from "sonner";
import { AppError } from "@/frontend/errors/AppError";
import { queryClient } from "@/frontend/providers/react-query-provider";

export default function useAddEmployee() {
  return useMutation({
    mutationFn: addEmployeeService,
    onSuccess: () => {
      toast.success("تم إضافة الموظف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: AppError) => {
      toast.error(error.message || "حدث خطأ أثناء إضافة الموظف");
    },
  });
}
