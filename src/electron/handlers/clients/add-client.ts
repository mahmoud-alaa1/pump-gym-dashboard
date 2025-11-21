import { ipcMainHandle } from "../../utils.js";
import { prisma } from "../../prismaClient.js";
async function handleAddClient(payload: EventMap["addClient"]["request"]) {
  const data = await prisma.client.create({
    data: {
      code: payload.code,
      client_name: payload.client_name,
      subscription_type: payload.subscription_type,
      phone: payload.phone,
      payment: payload.payment,
      gender: payload.gender,
      visitors: payload.visitors,
      payment_type: payload.payment_type,
      created_by: payload.created_by,
    },
  });
  return data;
}

export function mainHandleAddClient() {
  ipcMainHandle(
    "addClient",
    async (payload) => {
      return await handleAddClient(payload);
    },
    "تم إضافة العميل بنجاح"
  );
}
