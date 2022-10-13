const {app, BrowserWindow, desktopCapturer, screen, ipcMain} = require('electron');
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

ipcMain.handle('get-sources', async (event) => {
    return await desktopCapturer.getSources({types: ['screen']});
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