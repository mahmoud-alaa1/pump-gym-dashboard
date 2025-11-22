import { prisma } from "../../main.js";
import { cleanData, ipcMainHandle } from "../../utils.js";
async function handleEditClient(payload: EventMap["editClient"]["request"]) {
  const cleanPayload = cleanData(payload);

  const data = await prisma.client.update({
    where: { id: payload.id },
    data: cleanPayload,
  });

  return data;
}

export function mainHandleEditClient() {
  ipcMainHandle(
    "editClient",
    async (payload) => {
      return await handleEditClient(payload);
    },
    "تم تعديل العميل بنجاح"
  );
}
