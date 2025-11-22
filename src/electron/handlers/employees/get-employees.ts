import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
async function handleGetEmployees() {
  const data = await prisma.employee.findMany();

  return data;
}

export function mainHandleGetEmployees() {
  ipcMainHandle(
    "getEmployees",
    async () => {
      return await handleGetEmployees();
    },
    "تم جلب الموظفين بنجاح"
  );
}
