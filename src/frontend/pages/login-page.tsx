import { LoginForm } from "../modules/auth/components/login-form";
import pump from "@/assets/pump.webp";

export default function LoginPage() {
  return (
    <div className="bg-muted  flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2 self-center font-medium">
          <img src={pump} alt="PUMP GYM" className="size-44" />
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
