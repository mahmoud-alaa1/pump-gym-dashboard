import { useMutation } from "@tanstack/react-query";
import { editClientService } from "../services";
import { toast } from "sonner";
import { AppError } from "@/frontend/errors/AppError";
import { editClientSchemaOutput } from "../schema/add-client";
import { queryClient } from "@/frontend/providers/react-query-provider";

export default function useEditClient({ id }: { id: number | string }) {
  return useMutation({
    mutationFn: (payload: editClientSchemaOutput) =>
      editClientService({
        ...payload,
        id,
      } as unknown as EventMap["editClient"]["request"]),
    onSuccess: () => {
      toast.success("تم تعديل العميل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: AppError) => {
      toast.error(error.message || "حدث خطأ أثناء تعديل العميل");
    },
  });
}
