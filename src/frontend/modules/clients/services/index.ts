import { callService } from "@/frontend/lib/utils";
import { Client } from "@prisma/client";

export async function addClientService(clientData: EventMap["addClient"]["request"]) {
  return callService<Client>(() => window.electron.addClient(clientData));
}

export async function getClientsService() {
  return callService<Client[]>(() => window.electron.getClients());
}
