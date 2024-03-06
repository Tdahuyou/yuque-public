const {app, BrowserWindow, ipcMain, Menu} = require('electron')

let win
function createWindow() {
  win = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })

  win.webContents.openDevTools()

  win.loadFile("./index.html")
}

function handleIPC() {
  ipcMain.handle('show-context-menu', (event) => {
    const template = [
      {
        label: '菜单一',
        click: () => {
          // 发送点击菜单一事件到渲染进程
          event.sender.send('context-menu-command', 'menu-item-1')
        }
      },
      { type: 'separator' },
      {
        label: '菜单二',
        type: 'checkbox',
        checked: true
      }
    ]

    const menu = Menu.buildFromTemplate(template)
    menu.popup({
      window: BrowserWindow.fromWebContents(event.sender)
    })
  })
}

app.whenReady().then(() => {
  createWindow()
  handleIPC()
})