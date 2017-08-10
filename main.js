const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const Tray = electron.Tray

require('electron-reload')(__dirname, {
    electron: require('electron')
});

// browser-window creates a native window
let mainWindow = null

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

const createWindow = () => {
    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({
        frame: false,
        enableLargerThanScreen: true,
        // x: 0,
        // y: 0,
        title: '',
        icon: __dirname + '/src/assets/process-monitor-icon.png'
    })

    const screenElectron = electron.screen
    const allScreens = screenElectron.getAllDisplays()

    let x = 0
    let y = 0
    let width = 0
    let height = 0
    // Select biggest screen monitor to open app
    for (let screen in allScreens) {
        if (allScreens[screen].workArea.width > width) {
            x = allScreens[screen].bounds.x
            y = allScreens[screen].bounds.y
            width = allScreens[screen].bounds.width
            height = allScreens[screen].bounds.height
        }
    }

    // Set Screen Position
    mainWindow.setPosition(x, y, true)

    // Set Screen Size
    mainWindow.setSize(width, height, true)

    // App icon tray
    appIcon = new Tray(__dirname + '/src/assets/process-monitor-icon.png');
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Fechar',
            type: 'normal',
            click: () => {
                app.quit();
            }
        }
    ]);
    appIcon.setToolTip('BrScanSupervisor')
    appIcon.setContextMenu(contextMenu)

    // App menu
    mainWindow.setMenuBarVisibility(false)

    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/src/app/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null
    });
};

app.on('ready', createWindow)

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})