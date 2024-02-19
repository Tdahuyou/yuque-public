const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('some data to hash').digest('hex');
console.log(hash); // 将打印出数据的 SHA-256 哈希值

// require('crypto').createHash('sha256').update('some data to hash').digest('hex')