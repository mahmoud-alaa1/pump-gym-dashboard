import { useMutation } from "@tanstack/react-query";
import { addClientService } from "../services";
import { toast } from "sonner";
import { AppError } from "@/frontend/errors/AppError";
import { addClientSchema } from "../schema/add-client";
import useAuth from "../../auth/store/useAuth";
import { Gender, SubscriptionType, Visitor } from "@prisma/client";

export default function useAddClient() {
  const auth = useAuth();
  return useMutation({
    mutationFn: (payload: addClientSchema) =>
      addClientService({
        client_name: payload.client_name,
        code: payload.code,
        subscription_type: payload.subscription_type as SubscriptionType,
        phone: payload.phone,
        payment: payload.payment,
        gender: payload.gender as Gender,
        visitors: payload.visitors as Visitor,
        payment_type: payload.payment_type,
        created_by: auth.user?.name ?? "Unknown",
      }),
    onSuccess: () => {
      toast.success("تم إضافة العميل بنجاح");
    },
    onError: (error: AppError) => {
      toast.error(error.message || "حدث خطأ أثناء إضافة العميل");
    },
  });
}
