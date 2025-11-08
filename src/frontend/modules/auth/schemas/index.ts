import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, "يجب أن يكون البريد الإلكتروني 2 حرف على الأقل")
    .max(50, "يجب أن يكون البريد الإلكتروني 50 حرف كحد أقصى"),
  password: z
    .string()
    .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
    .max(100, "يجب أن تكون كلمة المرور 100 حرف كحد أقصى"),
});

export type loginSchema = z.infer<typeof loginSchema>;
