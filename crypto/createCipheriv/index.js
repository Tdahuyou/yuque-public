const crypto = require('crypto');

// 定义加密算法和密钥，生成随机密码和向量
const algorithm = 'aes-256-cbc'
const password = crypto.randomBytes(32) // 生成随机 32 字节的密码
const iv = crypto.randomBytes(16) // 生成随机 16 字节的向量

// 待加密的数据
const data = 'Hello, World!'
console.log('Original data:', data)

// 创建加密算法实例
const cipher = crypto.createCipheriv(algorithm, password, iv)

// 使用 update 方法对数据进行加密
let encrypted = cipher.update(data, 'utf8', 'hex')
// 加密后的数据以十六进制形式(即字符串)返回
encrypted += cipher.final('hex')

console.log('Encrypted data:', encrypted)

// 创建解密算法实例
const decipher = crypto.createDecipheriv(algorithm, password, iv)

// 使用 update 方法对数据进行解密
let decrypted = decipher.update(encrypted, 'hex', 'utf8')
// 返回解密后的字符串 utf8编码
decrypted += decipher.final('utf8')

console.log('Decrypted data:', decrypted)

// 加上随机的初始化向量
// 每次得到的加密结果是不一样的

// $ node index.js
// Original data: Hello, World!
// Encrypted data: 6e6cba403663387f438c7237ce08efb0
// Decrypted data: Hello, World!

// $ node index.js
// Original data: Hello, World!
// Encrypted data: 7bbada09d2a6d615bd612beef5321b0c
// Decrypted data: Hello, World!

// $ node index.js
// Original data: Hello, World!
// Encrypted data: 253ffdce79bdf2e66bb854d6b10b6dff
// Decrypted data: Hello, World!