import z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string(),
  password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
});

export type employeeSchema = z.infer<typeof employeeSchema>;

export const editEmployeeSchema = employeeSchema.partial();
export type editEmployeeSchema = z.infer<typeof editEmployeeSchema>;
