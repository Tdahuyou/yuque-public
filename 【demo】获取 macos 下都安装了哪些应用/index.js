const { spawn } = require('child_process')
const plist = require('plist') // https://www.npmjs.com/package/plist

function getApps(resolve, reject) {
  let resultBuffer = Buffer.from([])
  // 通过 spawn 调用 system_profiler 脚本
  const profileInstalledApps = spawn('/usr/sbin/system_profiler', [
    '-xml',
    '-detailLevel',
    'mini',
    'SPApplicationsDataType',
  ])

  // 监听返回结果，写入 resultBuffer
  profileInstalledApps.stdout.on('data', (chunkBuffer) => {
    resultBuffer = Buffer.concat([resultBuffer, chunkBuffer])
  })

  // 监听退出事件
  profileInstalledApps.on('exit', (exitCode) => {
    if (exitCode !== 0) {
      reject('Failed to get the list of installed applications.')
      return
    }

    try {
      // 解析 XML 文档
      const [installedApps] = plist.parse(resultBuffer.toString())
      // 返回结果
      resolve(installedApps._items)
    } catch (error) {
      reject(error)
    }
  })

  // 出错后抛出
  profileInstalledApps.on('error', (err) => {
    reject(err)
  })
}

getApps(
  (apps) => {
    console.log("Installed Applications:", apps[0]);
  },
  (error) => {
    console.error("Error:", error);
  }
);