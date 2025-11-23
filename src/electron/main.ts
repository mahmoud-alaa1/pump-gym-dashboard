import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resource-manger.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { mainHandleLogin } from "./handlers/auth.js";
import { mainHandleGetClients } from "./handlers/clients/get-clients.js";
import { mainHandleAddClient } from "./handlers/clients/add-client.js";
import { mainHandleDeleteClients } from "./handlers/clients/delete-clients.js";
import { mainHandleEditClient } from "./handlers/clients/edit-client.js";
import { mainHandleGetEmployees } from "./handlers/employees/get-employees.js";
import { mainHandleAddEmployee } from "./handlers/employees/add-employee.js";
import { mainHandleDeleteEmployees } from "./handlers/employees/delete-employee.js";
import fs from "fs";

let PrismaClient: typeof import("@prisma/client").PrismaClient;

if (app.isPackaged) {
  const clientPath = path.join(
    process.resourcesPath,
    "prisma/@prisma/client/index.js"
  );
  PrismaClient = (await import(pathToFileURL(clientPath).href)).PrismaClient;
} else {
  PrismaClient = (await import("@prisma/client")).PrismaClient;
}
const dbPath = isDev()
  ? path.join(app.getAppPath(), "./prisma/data.db")
  : path.join(app.getPath("userData"), "data.db");
export const prisma = new PrismaClient({
  datasources: { db: { url: `file:${dbPath}` } },
});
import path from "path";
import { createMenu } from "./menu.js";
import { pathToFileURL } from "url";

if (app.isPackaged) {
  process.env.PRISMA_QUERY_ENGINE_BINARY = path.join(
    process.resourcesPath,
    "prisma/.prisma/query_engine-windows.dll.node"
  );
}

if (!isDev()) {
  try {
    // database file does not exist, need to create
    fs.copyFileSync(
      path.join(process.resourcesPath, "prisma/data.db"),
      dbPath,
      fs.constants.COPYFILE_EXCL
    );
    console.log("New database file created");
  } catch (err) {
    //@ts-expect-error code property exists
    if (err.code != "EEXIST") {
      console.error(`Failed creating sqlite file.`, err);
    } else {
      console.log("Database file detected");
    }
  }
}

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1440,
    icon: path.join(getAssetsPath(), "pump.jpg"),
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
  createMenu(mainWindow);
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
