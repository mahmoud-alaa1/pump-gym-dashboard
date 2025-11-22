import { useMutation } from "@tanstack/react-query";
import { deleteClientsService } from "../services";
import { toast } from "sonner";
import { queryClient } from "@/frontend/providers/react-query-provider";

export default function useDeleteClients() {
  return useMutation({
    mutationFn: deleteClientsService,
    onSuccess: (_, variables) => {
      toast.success(
        `تم حذف ${variables.length == 1 ? "العميل" : "العملاء"} بنجاح`
      );
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("حدث خطأ أثناء حذف العملاء");
    },
  });
}
