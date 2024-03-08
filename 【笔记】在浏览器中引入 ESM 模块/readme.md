在浏览器中打开 index.html 文件，打开调试工具，切换到 Console 模块，输入 a

- 未开启模块化 - 成功打印 1 - 意味着没有开启模块化，模块内部定义的成员直接污染到了全局
- 开启模块化 - 报错 Uncaught ReferenceError: a is not defined - 意味着浏览器将 index.js 视作了一个模块来处理，模块内部的成员并没有污染全局