import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resource-manger.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { mainHandleLogin } from "./handlers/auth.js";
import { mainHandleGetClients } from "./handlers/clients/get-clients.js";
import { mainHandleAddClient } from "./handlers/clients/add-client.js";
import { mainHandleDeleteClients } from "./handlers/clients/delete-clients.js";
import { mainHandleEditClient } from "./handlers/clients/edit-client.js";
import { mainHandleGetEmployees } from "./handlers/employees/get-employees.js";
import { mainHandleAddEmployee } from "./handlers/employees/add-employee.js";
import { mainHandleDeleteEmployees } from "./handlers/employees/delete-employee.js";

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
  mainHandleDeleteClients();
  mainHandleEditClient();
  mainHandleGetEmployees();
  mainHandleAddEmployee();
  mainHandleDeleteEmployees();

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
