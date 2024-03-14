
能够快速搭建一个简单的 Electron 学习环境，实现一个小 demo，为接下来的 Electron 相关知识点的学习做准备。

- 认识 Electron 应用的最小组成
- 能够从 0 到 1 快速搭建一个简单的 Electron 学习环境（Electron 应用的最小组成）
- 全程耗时控制在 1min ~ 3min（不算下载依赖耗时）

# 视频

- [yuque](https://www.yuque.com/huyouda/electron/ap2m53go480tugvd)

# 最终效果

本节需要实现的 demo 效果非常简单 —— 启动 Electron 应用并在页面上渲染出 `Hello World`。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/2331396/1708772998510-2c0cc217-db0e-498c-a4a9-6fa557cbe26b.png#averageHue=%23fdfdfd&clientId=u1d934f1f-25af-4&from=paste&height=600&id=fcATy&originHeight=1200&originWidth=1600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=35935&status=done&style=stroke&taskId=uabac90f9-8adf-4f56-8c6a-b8857851f71&title=&width=800)

# 实现步骤

下面，我们来介绍一下具体的实现步骤。

要初始化 Electron 学习环境，需要先安装 Node.js 和 npm。你可以通过 `npm -v`、`node -v` 来查看是否装好了这俩玩意儿。

```bash
$ npm -v
# 10.2.3
$ node -v
# v20.10.0
```

如果成功打印出版本号，那么意味着已经成功安装好了。否则，你需要到 [Node.js 官网](https://nodejs.org/en)事先下载好 nodejs 和 npm，直接下来 LTS 版本即可，下载过程全程下一步，傻瓜式安装。安装好 nodejs 之后，npm 也会随之自动安装好的。装完之后，再用上述命令试试看。

在安装好 nodejs、npm 之后，可以按照以下步骤初始化 Electron 学习环境：

1. 创建一个新的空目录，例如 `my-electron-app`。
2. 进入该目录，执行 `npm init -y` 命令来初始化 npm 包，这将创建一个默认的 `package.json` 文件。
3. 通过 npm 来安装 Electron：`npm i electron`。

如果你在使用 `npm` 安装 `electron` 时速度特别慢，那么可以考虑改用 `cnpm` 来安装 `electron`，命令为 `cnpm i electron`。不过在使用 `cnpm` 之前，你得事先通过下载好 `cnpm` 才行。你可以通过 `npm i -g cnpm` 来在你的电脑上全局安装 `cnpm`。

`package.json` 文件内容如下。

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^29.0.1"
  }
}
```

在 `package.json` 文件中的 `dependencies` 字段中，可以看到我们已经成功安装好了 electron，并且版本为 `v29`_（当前时间 2024 年 02 月 24 日 18:59:43）_。我们还可以看到一个 `main` 字段，这个字段表示的是我们程序的入口，默认是没有这个文件的，我们需要手动新建一个入口文件 `index.js`。

4. 创建一个新的 JavaScript 文件 `index.js`，并在其中编写 Electron 应用程序的主进程代码。

下面是 index.js 文件的内容。

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow()

  // 加载应用的 index.html
  win.loadFile('index.html')
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  createWindow()
})
```

上述 index.js 文件中提供的示例代码会创建一个简单的 Electron 应用程序窗口。但是，创建窗口还需要加载一个 `index.html` 文件，因此，我们还需要准备好这个文件，它相当于一个渲染进程的页面文件。

5. 创建一个新的 HTML 文件 `index.html`，并在其中编写应用程序的界面代码。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>initialize-electron-learning-environment</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

上述代码将在应用程序窗口中显示一个简单的“Hello, World!”消息。截止到这一步，其实我们已经完成了这个 demo，可以通过 `npx electron .` 命令来启动 electron 应用程序来看下最终的效果。

你如果习惯于使用 `npm run dev` 命令的写法来启动应用，你也可以将启动命令给配置到 `package.json` 的 `scripts` 字段中，无非就是加一个命令的映射脚本罢了。这或许能够给你提供一丢丢便利，方便你接下来能够以自己更熟悉的写法启动应用。

6. 修改 `package.json` 文件，以指定应用程序的入口文件和打包命令。

```json
{
  "name": "my-electron-app",
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

上面是修改后的 `package.json` 文件的内容，主要就是在 `scripts` 字段中新增了一个 `"dev": "electron ."` 命令映射脚本。

`electron .` 表示在当前目录下启动 Electron 应用，下面对 `electron .` 命令做一个简单的阐述。

其中 `electron` 是启动 Electron 应用的命令，后面的 `.` 表示当前目录，也就是将当前目录下的代码作为 Electron 应用的代码进行启动。在执行该命令前需要确保当前目录下存在 `package.json` 文件并且已经安装了 electron 依赖。`electron` 会去读取 `package.json` 中的 `main` 字段指定的文件，将其作为应用程序的入口。

7. 运行应用程序：`npm run dev`，这将启动 Electron 应用程序，并在窗口中显示“Hello, World!”消息。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/2331396/1708772998510-2c0cc217-db0e-498c-a4a9-6fa557cbe26b.png#averageHue=%23fdfdfd&clientId=u1d934f1f-25af-4&from=paste&height=600&id=g2gVR&originHeight=1200&originWidth=1600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=35935&status=done&style=stroke&taskId=uabac90f9-8adf-4f56-8c6a-b8857851f71&title=&width=800)

# 小结

本节介绍的内容归纳起来，其实也就 3 个文件。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/2331396/1710386582444-fc695b43-d379-4f5c-9753-7ce26dc2743d.png#averageHue=%23a6a6a5&clientId=u728f02b2-9966-4&from=paste&height=908&id=fn2jz&originHeight=1362&originWidth=1577&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=281121&status=done&style=stroke&taskId=u6d771fc7-2738-4b7f-b14f-7e5cb991140&title=&width=1051.3333333333333)
