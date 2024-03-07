const { exec } = require('child_process')
const path = require('path')

/** 获取当前时间并格式化为 yyyy-mm-dd-hh-mm-ss */
function getFormattedTime() {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hour = now.getHours().toString().padStart(2, '0')
  const minute = now.getMinutes().toString().padStart(2, '0')
  const second = now.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day}-${hour}-${minute}-${second}`
}

const screenshotPath = path.join(__dirname, `${getFormattedTime()}.jpg`)

const command = `screencapture -x -i "${screenshotPath}"`

exec(command, (error) => {
  if (error) {
    console.error(`执行出错: ${error}`)
    return
  }
  console.log(`屏幕截图已保存至: ${screenshotPath}`)
})
