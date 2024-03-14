const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')


function mainWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280, 
    minHeight: 720,
    fullscreenable:true,
    maximizable:true, 
    autoHideMenuBar:true,
    webPreferences: {
    nodeIntegration: true,
    // nodeIntegrationInWorker: true,
    // nodeIntegrationInSubFrames: true,
    // enableRemoteModule: true,
    // contextIsolation: false,
    preload: path.join(__dirname, '/preloaders/loading.js')
    },
    backgroundColor:'#000000',
  })

  win.loadFile('ui/load.html')

  win.webContents.setWindowOpenHandler((details) => {
    require("electron").shell.openExternal(details.url);
    return { action: 'deny' }
  })

  const { ipcMain } = require('electron/main')
  ipcMain.handle('getDirectory', async (event, args) => {
    console.log("ok")
  })
}

app.whenReady().then(() => {
  mainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})