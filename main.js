const {app, Menu, BrowserWindow, desktopCapturer, screen, ipcMain, Notification} = require('electron');
const path = require('path');

const WIDTH_WINDOW = 290;
const HEIGHT_WINDOW = 80;

function createWindow() {
    const {width, height} = screen.getPrimaryDisplay().size;
    const win = new BrowserWindow({
        width: WIDTH_WINDOW,
        height: HEIGHT_WINDOW,
        resizable: false,
        x: width - WIDTH_WINDOW - 50,
        y: height - HEIGHT_WINDOW - 50,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'Recorder.js')
        }
    })

    win.loadFile('index.html');
    //win.openDevTools();
}

ipcMain.handle('show-notification', async (event, {title, body}) => {
    new Notification({title, body}).show()
});

ipcMain.on('show-context-menu', async (event) => {
    const sources = await desktopCapturer.getSources({types: ['window', 'screen']});

    const template = sources.map(source => ({
        label: source.name,
        click: () => {
            event.sender.send('context-menu-command', source.id)
        }
    }));

    const menu = Menu.buildFromTemplate(template)
    menu.popup(BrowserWindow.fromWebContents(event.sender))
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})