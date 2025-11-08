import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { errorResponse, successResponse } from "./utils/responses.js";
import { AppError } from "./errors/AppError.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventMap>(
  key: Key,
  handler: (
    payload: EventMap[Key]["request"],
    event: Electron.IpcMainInvokeEvent
  ) => Promise<EventMap[Key]["response"]> | EventMap[Key]["response"],
  message?: string
) {
  ipcMain.handle(
    key,
    async (event, payload): Promise<ApiResponse<EventMap[Key]["response"]>> => {
      try {
        if (event.senderFrame) validateEventFrame(event.senderFrame);
        const data = await handler(payload, event);
        return successResponse(data, message);
      } catch (err) {
        console.log(
          "***********************************************************************"
        );
        if (err instanceof AppError) {
          console.error("here i throw fkin native err");
          throw err;
        }
        throw new AppError("خطا داخلي من التطبيق", {
          code: "INTERNAL_ERROR",
        });
      }
    }
  );
}

export function ipcWebContentsSend<Key extends keyof EventMap>(
  key: Key,
  webContents: WebContents,
  payload: EventMap[Key]["request"]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious frame detected");
  }
}
