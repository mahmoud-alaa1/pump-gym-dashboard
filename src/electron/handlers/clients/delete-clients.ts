import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
async function handleDeleteClients(clientIds: number[]) {
  await prisma.client.deleteMany({
    where: {
      id: {
        in: clientIds,
      },
    },
  });
}

export function mainHandleDeleteClients() {
  ipcMainHandle(
    "deleteClients",
    async (payload) => {
      return await handleDeleteClients(payload);
    },
    "تم حذف العملاء بنجاح"
  );
}
