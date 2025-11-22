import bcrypt from "bcryptjs";
import { ipcMainHandle } from "../utils.js";
import { AppError, ErrorCodes } from "../errors/AppError.js";
import { prisma } from "../main.js";
async function handleLogin(username: string, password: string) {
  console.log("electron", username, password);
  const user = await prisma.employee.findUnique({ where: { username } });
  console.log("electron", username, password);
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
      return await handleLogin(payload.username, payload.password);
    },
    "تم تسجيل الدخول بنجاح"
  );
}
