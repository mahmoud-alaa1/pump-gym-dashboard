import { prisma } from "../prismaClient.js";
import bcrypt from "bcryptjs";
import { ipcMainHandle } from "../utils.js";
import { AppError, ErrorCodes } from "../errors/AppError.js";
async function handleLogin(email: string, password: string) {
  const user = await prisma.employee.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("المستخدم غير موجود", {
      code: ErrorCodes.USER_NOT_FOUND,
    });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError("كلمة المرور غير صحيحة", {
      code: ErrorCodes.INVALID_CREDENTIALS,
    });
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
}

export function mainHandleLogin() {
  ipcMainHandle(
    "login",
    async (payload) => {
      return await handleLogin(payload.email, payload.password);
    },
    "تم تسجيل الدخول بنجاح"
  );
}
