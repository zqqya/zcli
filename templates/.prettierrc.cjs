// 导出一个配置对象，用于规定代码的格式化规则
module.exports = {
  printWidth: 100, // 设置代码的打印宽度，即每行代码的最大字符数
  useTabs: false, // 指定是否使用制表符进行缩进
  tabWidth: 2, // 设置制表符的宽度，如果使用空格缩进则无影响
  singleQuote: true, // 指定是否使用单引号作为字符串的默认引用符号
  semi: false, // 指定是否在句尾添加分号
  bracketSpacing: true, // 指定对象字面量中的大括号和键值对之间是否添加空格
  endOfLine: 'auto', // 设置行尾的换行符，自动选择基于操作系统的换行符
  trailingComma: 'all', // 在对象和数组的最后一个元素后面是否添加逗号
  arrowParens: 'avoid', // 指定箭头函数的括号使用规则，尽可能避免使用括号
  htmlWhitespaceSensitivity: 'strict', // 设置HTML中的空白字符敏感度，严格模式下会保留所有空白字符
  proseWrap: 'never' // 设置文本内容的换行方式，从不换行
}
