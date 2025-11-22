import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
import bcrypt from "bcryptjs";
async function handleAddEmployee(payload: EventMap["addEmployee"]["request"]) {
  payload.password = await bcrypt.hash(payload.password, 10);
  const data = await prisma.employee.create({
    data: payload,
  });
  return data;
}

export function mainHandleAddEmployee() {
  ipcMainHandle(
    "addEmployee",
    async (payload) => {
      return await handleAddEmployee(payload);
    },
    "تم إضافة العميل بنجاح"
  );
}
