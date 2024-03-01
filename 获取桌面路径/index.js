// 打开终端输入命令 npx run dev 查看最终的打印结果
const { app } = require('electron');

app.on('ready', () => {
  const desktopPath = app.getPath('desktop');
  console.log('[desktopPath]:', desktopPath);
});
