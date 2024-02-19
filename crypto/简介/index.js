const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('some data to hash').digest('hex');
console.log(hash); // 将打印出数据的 SHA-256 哈希值

// require('crypto').createHash('sha256').update('some data to hash').digest('hex')

// 执行结果
// $ node index.js
// 6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
// $ node index.js
// 6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50

// 执行多次，结果都是一样的。