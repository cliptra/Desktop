const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const express = require('express')
const expapp = express()
const port = 7827

expapp.get('/', (req, res) => {
  res.send("Hello World! This is a backend server for the Cliptra desktop app. Please do not worry about it.")
})

const requestRouter = require('./server_router.js')
expapp.use('/request', requestRouter)

expapp.listen(port, () => {
  console.log(`> Server is listening, on port ${port}`)
})

var win;

function mainWindow(nodeIntegration) {
  win = new BrowserWindow({
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
  })

  win.loadFile('ui/load.html')

  win.webContents.setWindowOpenHandler((details) => {
    require("electron").shell.openExternal(details.url);
    return { action: 'deny' }
  })

  expapp.get('/authorize_account', (req, res) => {
    var token = req.query.token
    if(!token) return;
  
    win.webContents
    .executeJavaScript(`localStorage.setItem("_user_token_", "${token}")`, true)
    .then(result => {
      console.log(result);
    });

    win.loadFile('ui/createDevice.html')
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