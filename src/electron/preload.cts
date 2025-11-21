import electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),
  getStaticData: () => ipcInvoke("getStaticData"),

  sendFrameAction: (payload) => {
    electron.ipcRenderer.send("sendFrameAction", payload);
  },
  login: (credentials: { email: string; password: string }) =>
    ipcInvoke("login", credentials),
  addClient: (clientData) => ipcInvoke("addClient", clientData),
  getClients: () => ipcInvoke("getClients"),
  deleteClients: (clientIds: number[]) => ipcInvoke("deleteClients", clientIds),
} satisfies Window["electron"]);

//utils

function ipcInvoke<Key extends keyof EventMap>(
  key: Key,
  payload?: EventMap[Key]["request"]
): Promise<EventMap[Key]["response"]> {
  return electron.ipcRenderer.invoke(key, payload);
}
function ipcOn<Key extends keyof EventMap>(
  key: Key,
  callback: (payload: EventMap[Key]["response"]) => void
) {
  const cb = (_: electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
