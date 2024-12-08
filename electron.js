const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  // Create the main window
  mainWindow = new BrowserWindow({
    fullscreen: true, // Open in full-screen mode
    resizable: false, // Prevent resizing
    frame: false, // Remove default window frame (close/minimize/maximize buttons)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "out/index.html"));

  // Completely disable the menu bar
  mainWindow.setMenuBarVisibility(false);

  // Handle window close
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
