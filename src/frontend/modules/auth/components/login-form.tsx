import { cn } from "@/frontend/lib/utils";
import { Button } from "@front/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@front/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas";
import { Form } from "@front/components/ui/form";
import FormInput from "@/frontend/components/form-fields/FormInput";
import { User } from "lucide-react";
import FormPassword from "@/frontend/components/form-fields/FormPassword";
import useLogin from "../hooks/useLogin";
const defaultValues: loginSchema = {
  username: "mostafa.saber",
  password: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  const { mutate: login } = useLogin();

  async function onSubmit(values: loginSchema) {
    login(values);
  }
  return (
    <div
      className={cn(
        "flex flex-col w-[clamp(350px,100%,500px)] gap-6",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">اهلا بعودتك</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInput<loginSchema>
                name="username"
                placeholder="ادخل اسم المستخدم"
                label="اسم المستخدم"
                Icon={<User className="size-5" />}
                autoComplete="username"
              />
              <FormPassword<loginSchema>
                name="password"
                label="كلمة المرور"
                placeholder="ادخل كلمة المرور"
                autoComplete="current-password"
              />
              <Button className="w-full" type="submit">
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
