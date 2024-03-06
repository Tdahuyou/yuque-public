const { app, BrowserView, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('./index.html')

  // 创建子窗口
  const view = new BrowserView()

  // 自窗口设置嵌入式子窗口
  win.setBrowserView(view)

  // 设置 x，y 坐标，窗口宽度和高度
  view.setBounds({ x: 200, y: 150, width: 400, height: 300 })

  // 加载页面
  view.webContents.loadURL('https://juejin.cn')
})
