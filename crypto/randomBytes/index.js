const crypto = require('crypto')

console.log(crypto.randomBytes(32).toString('hex'))
console.log(crypto.randomBytes(8).toString('hex'))
console.log(crypto.randomBytes(1).toString('hex'))

// hex 是十六进制 hexadecimal 的简称
// 一个字节，用两位十六进制表示

// 执行结果：

// $ node index.js
// ba9e056bec4305de17542473d439526d26828ff5e37d39a5a4c6e02accd5c852
// 72e51ffdc3d14910
// 5d

// $ node index.js
// 06b3173a9894de8bc97baf1921ede4832f77fbabd7ba740b29e6d9f98a90edd8
// d91f4d91aadc6a97
// 54

// $ node index.js
// 9d70e1fe52324d78f2904ad3f5043649e9429ed2785f04f990f77ba486a9f724
// 94f7cf63ed27184c
// 96