import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { AppError } from "./errors/AppError.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  const expectedUrl = pathToFileURL(getUIPath()).toString();
  
  // CRITICAL FIX: HashRouter adds "#/route" to the end of the URL.
  // We must check if the frame URL *starts with* the expected file path
  // instead of checking for strict equality.
  if (!frame.url.startsWith(expectedUrl)) {
    console.error("Security Warning: Frame URL mismatch", {
      actual: frame.url,
      expected: expectedUrl
    });
    throw new Error("Malicious frame detected");
  }
}

export function ipcMainHandle<Key extends keyof EventMap>(
  key: Key,
  handler: (
    payload: EventMap[Key]["request"],
    event: Electron.IpcMainInvokeEvent
  ) => Promise<EventMap[Key]["response"]> | EventMap[Key]["response"],
  message?: string
) {
  ipcMain.handle(key, async (event, payload) => {
    try {
      if (event.senderFrame) validateEventFrame(event.senderFrame);
      const data = await handler(payload, event);
      return { ok: true, data, message };
    } catch (err) {
      // DEBUG: Log the ACTUAL error to the file/console
      console.error(`Error in IPC handler [${key}]:`, err);

      if (err instanceof AppError) {
        return { ok: false, error: err.serialize() };
      }

      const internalErr = new AppError("خطأ داخلي من التطبيق", {
        code: "INTERNAL_ERROR",
      });

      return { ok: false, error: internalErr.serialize() };
    }
  });
}

export function ipcWebContentsSend<Key extends keyof EventMap>(
  key: Key,
  webContents: WebContents,
  payload: EventMap[Key]["request"]
) {
  webContents.send(key, payload);
}

/**
 @param obj The object to clean by removing undefined values
 @returns A new object with only defined values
*/
export function cleanData<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}