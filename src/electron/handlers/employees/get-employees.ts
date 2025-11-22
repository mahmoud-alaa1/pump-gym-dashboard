import { prisma } from "../../main.js";
import { ipcMainHandle } from "../../utils.js";
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
