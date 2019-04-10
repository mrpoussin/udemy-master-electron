// modules
const {BrowserWindow} = require('electron')

// browser window
let bgItemWin

// Now read item method
module.exports = (url, callback) => {
   
    // create new offscreen browser window
    bgItemWin = new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false,
        webPreferences: {
            offscreen: true
        }
    })

    // load item url into this window
    bgItemWin.loadURL(url);

    // wait for page to finish loading
    bgItemWin.webContents.on('did-finish-load', () => {

        // get screenshot 
        bgItemWin.webContents.capturePage((image) => {
            // get image as data URI
            const screenshot = image.toDataURL()

            // get page title
            const title = bgItemWin.getTitle()
            
            // return new item via callback
            callback({ title, screenshot, url})

            // clean up this browser window
            bgItemWin.close()
            bgItemWin = null
        })
    })
}