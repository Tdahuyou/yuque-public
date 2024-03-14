
`ipcRenderer.send`、`ipcMain.on`、`渲染进程 -> 主进程`、`单向 IPC`

# 视频

- [yuque](https://www.yuque.com/huyouda/electron/gwlg4ewf0rdqg58f)

# 源码

## package.json

```json
{
  "name": "ipcrenderer.send",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^29.0.1"
  }
}
```

## index.js

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')

let win
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.webContents.openDevTools()

  win.loadFile('./index.html')
}

function handleIPC() {
  ipcMain.on('message-from-renderer', (event, ...args) => {
    console.log('主进程收到了来自渲染进程的消息')
    console.log('渲染进程在发送 message-from-renderer 请求时，传递的参数如下：')
    console.log(...args)
  })
}

app.on('ready', () => {
  createWindow()
  handleIPC()
})
```

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24.02.24</title>
</head>
<body>
  <h1>renderer process</h1>
  <button id="btn">ipcRenderer.send('message-from-renderer', 1, 2, 3)</button>
  <script>
    const { ipcRenderer } = require('electron')
    document.getElementById('btn').addEventListener('click', () => {
      console.log('按钮被点击了，向主进程发起 message-from-renderer 请求，并传入请求参数 1、2、3')
      ipcRenderer.send('message-from-renderer', 1, 2, 3)
    })
  </script>
</body>
</html>
```

# 最终效果

![image.png](https://cdn.nlark.com/yuque/0/2024/png/2331396/1708782877884-bbfab4c6-6ad6-4d9e-a5d6-2af48d911552.png#averageHue=%23595959&clientId=u10e79fff-212b-4&from=paste&height=507&id=ua8d0a468&originHeight=1014&originWidth=2076&originalType=binary&ratio=2&rotation=0&showTitle=false&size=208174&status=done&style=stroke&taskId=ufb5a8c31-b269-4437-8bb2-c876de9049f&title=&width=1038)
