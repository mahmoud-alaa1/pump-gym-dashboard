import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
async function handleGetClients() {
  const data = await prisma.client.findMany();
  return data;
}

export function mainHandleGetClients() {
  ipcMainHandle(
    "getClients",
    async () => {
      return await handleGetClients();
    },
    "تم جلب العملاء بنجاح"
  );
}
