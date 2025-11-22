import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
async function handleAddEmployee(payload: EventMap["addEmployee"]["request"]) {
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
