import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/frontend/providers/react-query-provider";
import { deleteEmployeesService } from "../services";

export default function useDeleteEmployees() {
  return useMutation({
    mutationFn: deleteEmployeesService,
    onSuccess: (_, variables) => {
      toast.success(
        `تم حذف ${variables.length == 1 ? "الموظف" : "الموظفين"} بنجاح`
      );
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("حدث خطأ أثناء حذف الموظفين");
    },
  });
}
