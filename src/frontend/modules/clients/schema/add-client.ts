import z from "zod";

export const addClientSchema = z.object({
  client_name: z
    .string()
    .min(2, { message: "الاسم قصير جدا" })
    .max(50, { message: "الاسم طويل جدا" }),
  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "رقم الهاتف غير صالح" }),
  code: z.string().min(1, { message: "الرمز مطلوب" }),
  subscription_type: z.string().min(1, { message: "نوع الاشتراك مطلوب" }),
  payment: z.coerce
    .number()
    .min(0, { message: "الدفع يجب أن يكون رقم إيجابي" }),
  gender: z.string().min(1, { message: "الجنس مطلوب" }),
  visitors: z.string().min(1, { message: "مصدر الزيارة مطلوب" }),
  payment_type: z.string().min(1, { message: "نوع الدفع مطلوب" }),
});

export type addClientSchemaOutput = z.output<typeof addClientSchema>;
export type addClientSchemaInput = z.input<typeof addClientSchema>;
export type addClientSchema = z.infer<typeof addClientSchema>;

/*
      id               Int      @id @default(autoincrement())
  client_name      String
  subscription_type SubscriptionType
  payment          Int
  phone            String
  code             Int
  payment_type     PaymentType
  visitors         Visitor
  created_by       String
  gender           Gender
  created_at       DateTime @default(now()) 
  */
