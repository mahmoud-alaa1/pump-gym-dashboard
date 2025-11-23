import { app, BrowserWindow, dialog } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resource-manger.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { mainHandleLogin } from "./handlers/auth.js";
import { mainHandleGetClients } from "./handlers/clients/get-clients.js";
import { mainHandleAddClient } from "./handlers/clients/add-client.js";
import { mainHandleDeleteClients } from "./handlers/clients/delete-clients.js";
import { mainHandleEditClient } from "./handlers/clients/edit-client.js";
import { mainHandleGetEmployees } from "./handlers/employees/get-employees.js";
import { mainHandleAddEmployee } from "./handlers/employees/add-employee.js";
import { mainHandleDeleteEmployees } from "./handlers/employees/delete-employee.js";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

// --- CUSTOM FILE LOGGER SETUP (DEBUGGING) ---
const logPath = path.join(app.getPath("userData"), "debug-logs.txt");

// Reset log file on startup
try {
  fs.writeFileSync(logPath, `*** APP STARTED AT ${new Date().toISOString()} ***\n`);
} catch (e) { /* ignore */ }

function logToFile(type: string, args: any[]) {
  try {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    fs.appendFileSync(logPath, `[${type}] ${message}\n`);
  } catch (err) { /* ignore */ }
}

// Override console.log to write to file
const originalLog = console.log;
console.log = (...args) => {
  originalLog(...args); 
  logToFile("INFO", args);
};

// Override console.error to write to file
const originalError = console.error;
console.error = (...args) => {
  originalError(...args);
  logToFile("ERROR", args);
};
// --------------------------------

// 1. Define DB Path
const dbPath = isDev()
  ? path.join(app.getAppPath(), "./prisma/data.db")
  : path.join(app.getPath("userData"), "data.db");

console.log("-----------------------------------------");
console.log("Environment:", isDev() ? "DEV" : "PROD");
console.log("Resources Path:", process.resourcesPath);
console.log("UserData Path:", app.getPath("userData"));
console.log("Target DB Path:", dbPath);
console.log("Log File Path:", logPath);
console.log("-----------------------------------------");

// 2. Initialize Prisma
export const prisma = new PrismaClient({
  datasources: { db: { url: `file:${dbPath}` } },
  log: ['query', 'info', 'warn', 'error'],
});

// 3. DB Copy Logic
if (!isDev()) {
  try {
    // This matches: "to": "prisma/data.db" in package.json
    const sourcePath = path.join(process.resourcesPath, "prisma", "data.db");
    console.log("Attempting to copy DB from:", sourcePath);
    
    if (!fs.existsSync(dbPath)) {
        // Ensure folder exists
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

        fs.copyFileSync(sourcePath, dbPath, fs.constants.COPYFILE_EXCL);
        console.log("SUCCESS: New database file created at:", dbPath);
    } else {
        console.log("SKIP: Database file already exists at:", dbPath);
    }
  } catch (err) {
    console.error("CRITICAL ERROR: Failed creating sqlite file.", err);
    dialog.showErrorBox("Database Error", `Failed to initialize database: ${err}`);
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
  
  // Force DevTools open for debugging
  mainWindow.webContents.openDevTools();

  pollResources(mainWindow);

  // Test Prisma Connection
  try {
    console.log("Testing Prisma Connection...");
    await prisma.$connect();
    console.log("✅ PRISMA CONNECTED SUCCESSFULLY");
  } catch (e) {
    console.error("❌ PRISMA CONNECTION FAILED:", e);
    dialog.showErrorBox("DB Connection Failed", "Check debug-logs.txt for details.");
  }

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
  handleCloseEvent(mainWindow);
});

function handleCloseEvent(mainWindow: BrowserWindow) {
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