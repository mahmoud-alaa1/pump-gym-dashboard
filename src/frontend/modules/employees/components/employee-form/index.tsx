import { ResponsiveModal } from "@/frontend/components/ResponsiveModal";
import { Button } from "@/frontend/components/ui/button";
import { Form } from "@/frontend/components/ui/form";
import FormInput from "@/frontend/components/form-fields/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { User, Users } from "lucide-react";
import { editEmployeeSchema, employeeSchema } from "../../schema";
import FormPassword from "@/frontend/components/form-fields/FormPassword";
import Spinner from "@/frontend/components/ui/spinner";

const defaultValues: employeeSchema = {
  email: "",
  name: "",
  password: "",
};

type EmployeeFormProps = {
  initialData?: editEmployeeSchema;
  mode?: "add" | "edit";
  onSubmit: (data: editEmployeeSchema, reset: () => void) => void;
  isPending: boolean;
};

export default function EmployeeForm({
  initialData,
  mode = "add",
  onSubmit,
  isPending,
}: EmployeeFormProps) {
  const form = useForm<editEmployeeSchema>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: initialData ?? defaultValues,
  });

  function submit(data: editEmployeeSchema) {
    onSubmit(data, () => form.reset());
  }

  return (
    <ResponsiveModal
      height="auto"
      trigger={
        mode === "add" ? (
          <Button variant="link" className="shadow-lg shadow-red-600/30">
            <Users className="ml-2 h-4 w-4" />
            اضف موظف
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:underline"
          >
            <Users className="ml-2 h-4 w-4" />
            تعديل الموظف
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            {mode === "add" ? "إضافة موظف جديد" : "تعديل بيانات الموظف"}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <fieldset disabled={isPending} className="space-y-6">
              <FormInput
                name="name"
                label="اسم الموظف"
                placeholder="ادخل اسم الموظف"
                type="text"
                Icon={
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
                }
              />
              <FormInput
                name="email"
                label="اسم المستخدم"
                placeholder="mahmoud.leg"
                type="text"
                Icon={
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
                }
              />
              <FormPassword
                name="password"
                label="كلمة المرور"
                placeholder="ادخل كلمة المرور"
              />
              <Button type="submit" className="w-full mt-4" >
                {isPending ? (
                  <Spinner />
                ) : mode === "add" ? (
                  "إضافة الموظف"
                ) : (
                  "تحديث البيانات"
                )}
              </Button>
            </fieldset>
          </form>
        </Form>
      </div>
    </ResponsiveModal>
  );
}
