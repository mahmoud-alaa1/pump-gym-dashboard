import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resource-manger.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { mainHandleLogin } from "./handlers/auth.js";
import { mainHandleGetClients } from "./handlers/clients/get-clients.js";
import { mainHandleAddClient } from "./handlers/clients/add-client.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1440,

    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (!isDev()) mainWindow.maximize();

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });
  mainHandleLogin();
  mainHandleGetClients();
  mainHandleAddClient();

  createTray(mainWindow);
  handleCloseEven(mainWindow);
});

function handleCloseEven(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e) => {
    if (willClose) return;
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });
  app.on("before-quit", () => {
    willClose = true;
  });
  mainWindow.on("show", () => {
    if (app.dock) {
      app.dock.show();
    }
    willClose = false;
  });
}
