const { remote } = require('electron')

// menu template object
const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add New',
                accelerator: 'CmdOrCtrl+N',
                click () { $('.open-add-modal').click() }
            },
            {
                label: 'Read Item',
                accelerator: 'Enter',
                click () { if (!$('#add-modal').hasClass('is-active')) window.openItem() }
            },
            {
                label: 'Delete Item',
                accelerator: 'Delete',
                click () { if (!$('#add-modal').hasClass('is-active')) window.deleteItem() }
            },
            {
                label: 'Search Item',
                accelerator: 'CmdOrCtrl+F',
                click () { if (!$('#add-modal').hasClass('is-active')) $('#search').focus() }
            },
            {
                label: 'Open In Browser',
                accelerator: 'CmdOrCtrl+Shift+Enter',
                click () { window.openInBrowser() }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
          ]
    },
    {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
          ]
    },
    {
        role: 'help',
        submenu: [
            {
              label: 'Learn More',
              click () { require('electron').shell.openExternal('https://electronjs.org') }
            }
        ]
    }
]

// Mac specific
if (process.platform === 'darwin') {
    // add first item 
    template.unshift({
        // add the rest
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })

    // mac extra window options
    templat[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

// add menu to app
const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)

