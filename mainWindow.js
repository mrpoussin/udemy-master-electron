const { BrowserWindow } = require('electron');

// BrowserWindow instance
exports.win

exports.createWindow = () => {
  // Create the browser window.
  this.win = new BrowserWindow({
    width: 700,
    height: 650,
    minHeight: 310,
    minWidth: 350,
    maxWidth: 1000,
    icon: `${__dirname}/icons/icon.png`
  })

  // and load the index.html of the app.
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  // Open the DevTools.
  this.win.webContents.openDevTools()

  // Emitted when the window is closed.
  this.win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.win = null
  })
}