const { app } = require('electron');
const path = require('path');

app.on('ready', () => {
  const exePath = app.getPath('exe'); // 获取应用的可执行文件路径
  console.log(exePath); // 打印可执行文件路径

  const installPath = path.join(exePath, '../'); // 获取到安装路径的上级路径，即安装目录
  console.log(installPath) // 打印安装目录
});