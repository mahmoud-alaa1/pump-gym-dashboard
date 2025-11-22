import { prisma } from "../../main.js";
import { ipcMainHandle } from "../../utils.js";
async function handleGetClients() {
  const data = await prisma.client.findMany({
    include: {
      created_by: {
        select: {
          name: true,
        },
      },
    },
  });

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
