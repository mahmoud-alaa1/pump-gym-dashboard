import { ResponsiveModal } from "@/frontend/components/ResponsiveModal";
import { Button } from "@/frontend/components/ui/button";
import { Form } from "@/frontend/components/ui/form";
import FormInput from "@/frontend/components/form-fields/FormInput";
import FormSelect from "@/frontend/components/form-fields/FormSelect";
import FormRadioGroup from "@/frontend/components/form-fields/FormRadioGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addClientSchema,
  addClientSchemaInput,
  addClientSchemaOutput,
  editClientSchemaOutput,
} from "../../schema/add-client";
import { User, Phone, Hash, CreditCard, Users, DollarSign } from "lucide-react";
import Spinner from "@/frontend/components/ui/spinner";

const defaultValues: addClientSchema = {
  code: "",
  gender: "",
  client_name: "",
  payment: 0,
  payment_type: "",
  phone: "",
  subscription_type: "",
  visitors: "",
};

const subscriptionOptions = [
  { label: "8 حصص", value: "LESSONS_8" },
  { label: "12 حصة", value: "LESSONS_12" },
  { label: "شهر واحد", value: "ONE_MONTH" },
  { label: "شهرين", value: "TWO_MONTHS" },
  { label: "ثلاثة أشهر", value: "THREE_MONTHS" },
  { label: "ستة أشهر", value: "SIX_MONTHS" },
  { label: "سنة", value: "YEAR" },
];

const visitorOptions = [
  { label: "فيسبوك", value: "FACEBOOK" },
  { label: "انستغرام", value: "INSTAGRAM" },
  { label: "تيك توك", value: "TIKTOK" },
  { label: "واتساب", value: "WHATSAPP" },
  { label: "إحالة", value: "REFERRAL" },
];

const genderOptions = [
  { label: "ذكر", value: "MALE" },
  { label: "انثى", value: "FEMALE" },
];

const paymentTypeOptions = [
  { label: "اول مرة", value: "NEW" },
  { label: "تجديد", value: "RENEWAL" },
];

type clientFormProps = {
  initialData?: editClientSchemaOutput;
  mode?: "add" | "edit";
  onSubmit: (data: addClientSchema, reset: () => void) => void;
  isPending: boolean;
};

export default function ClientForm({
  initialData,
  mode = "add",
  onSubmit,
  isPending,
}: clientFormProps) {
  const form = useForm<addClientSchemaInput, undefined, addClientSchemaOutput>({
    resolver: zodResolver(addClientSchema),
    defaultValues: initialData ?? defaultValues,
  });

  function submit(data: addClientSchema) {
    onSubmit(data, () => form.reset());
  }

  return (
    <ResponsiveModal
      height="80vh"
      trigger={
        mode === "add" ? (
          <Button variant="link" className="shadow-lg shadow-red-600/30">
            <Users className="ml-2 h-4 w-4" />
            اضف عميل
          </Button>
        ) : (
          <Button variant="ghost" className="flex items-center gap-2 hover:underline">
            <Users className="ml-2 h-4 w-4" />
            تعديل العميل
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            {mode === "add" ? "إضافة عميل جديد" : "تعديل بيانات العميل"}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <User className="h-4 w-4 text-red-600" />
                المعلومات الشخصية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="client_name"
                  label="الاسم الكامل"
                  placeholder="أدخل الاسم"
                  Icon={<User className="h-4 w-4" />}
                  className="bg-background/50"
                />
                <FormInput
                  name="phone"
                  label="رقم الهاتف"
                  dir="ltr"
                  placeholder="01xxxxxxxxx"
                  Icon={<Phone className="h-4 w-4" />}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="code"
                  label="الكود"
                  placeholder="أدخل الكود"
                  Icon={<Hash className="h-4 w-4" />}
                  className="bg-background/50"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">النوع</label>
                  <FormRadioGroup
                    name="gender"
                    options={genderOptions}
                    labelPosition="none"
                    className="flex gap-4"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-red-600" />
                معلومات الاشتراك
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  name="subscription_type"
                  label="نوع الاشتراك"
                  options={subscriptionOptions}
                  placeholder="اختر نوع الاشتراك"
                  className="bg-background/50"
                />
                <FormInput
                  name="payment"
                  label="المبلغ المدفوع"
                  type="number"
                  placeholder="0"
                  Icon={<DollarSign className="h-4 w-4" />}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الدفع</label>
                <FormRadioGroup
                  name="payment_type"
                  options={paymentTypeOptions}
                  labelPosition="none"
                  className="flex gap-4"
                />
              </div>
            </div>

            {/* Marketing Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <Users className="h-4 w-4 text-red-600" />
                كيف سمع عنا
              </h3>
              <FormSelect
                name="visitors"
                label="مصدر الزيارة"
                options={visitorOptions}
                placeholder="اختر مصدر الزيارة"
                className="bg-background/50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                disabled={isPending}
                type="submit"
                className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30"
              >
                {isPending ? <Spinner /> : "حفظ البيانات"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="flex-1"
              >
                إعادة تعيين
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ResponsiveModal>
  );
}
