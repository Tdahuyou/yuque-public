`渲染进程 <-> 主进程`

# 视频

- [yuque](https://www.yuque.com/huyouda/electron/kk8wqxcrpy9yvw47)

# 流程图

![](https://cdn.nlark.com/yuque/0/2023/jpeg/2331396/1684640795270-54ec3fc4-3faa-4fbf-9b0e-0b9d19a69d3c.jpeg)

# 源码

## package.json

```json
{
  "name": "send-on",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "electron ."
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^29.1.0"
  }
}
```

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24.03.02</title>
</head>
<body>
  <h1>renderer process</h1>
  <button id="btn">send</button>
  <script src="renderer.js"></script>
</body>
</html>
```

## renderer.js

```javascript
const { ipcRenderer } = require('electron')

// 1. 按钮被点击
btn.onclick = () => {
  // 2. 渲染进程主动给主进程发 'message-from-renderer' 消息
  ipcRenderer.send('message-from-renderer', 1, 2, 3)
}

// 3. 渲染进程被动监听来自主进程的 'message-from-main' 消息
ipcRenderer.on('message-from-main', (_, res) => {
  console.log('receive message from main process', res)
})
```

## index.js

```javascript
const {app, BrowserWindow, ipcMain} = require('electron')

let win
function createWindow() {
  win = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })

  win.webContents.openDevTools()

  win.loadFile("./index.html")
}

function handleIPC() {
  // 1. 主进程被动监听来自渲染进程的 'message-from-renderer' 消息
  ipcMain.on('message-from-renderer', (event, ...args) => {
    console.log('receive message from renderer process', ...args)

    // 2. 执行求和功能
    const sum = args.reduce((a, b) => a + b, 0)

    // 3. 主进程处理完相应任务后，给渲染进程响应一个结果，主动给渲染进程发 'message-from-main' 消息。
    // win.webContents.send('message-from-main', sum) // A
    // event.sender.send('message-from-main', sum) // B
    event.reply('message-from-main', sum) // C

    // console.log(win.webContents === event.sender) // true
    // console.log(win.webContents.send === event.sender.send) // true

    // A B C 3 种写法都是等效的，都可以给渲染进程响应一个结果。
  })
}

app.on('ready', () => {
  createWindow()
  handleIPC()
})
```

# 最终效果

![image.png](https://cdn.nlark.com/yuque/0/2024/png/2331396/1709349161150-53e1a32f-c01c-46e1-8b77-92e1864bc9e7.png#averageHue=%23f4f4f4&clientId=u072e3cda-36b8-4&from=paste&height=188&id=u53a097ad&originHeight=376&originWidth=1600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=59791&status=done&style=stroke&taskId=uffe1094a-2be9-474f-b10d-41e79a8451d&title=&width=800)

```bash
receive message from renderer process 1 2 3
```

