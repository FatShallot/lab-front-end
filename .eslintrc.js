module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 添加了一些规则，否则受不了这些繁琐的格式检测
    // // allow paren-less arrow functions
    // 'arrow-parens': 0,
    // // allow async-await
    // 'generator-star-spacing': 0,
    // // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // "no-unused-vars": [2, { 
    //   // 允许声明未使用变量
    //   "vars": "local",
    //   // 参数不检查
    //   "args": "none" 
    // }],
    // // 关闭语句强制分号结尾
    // "semi": [0],
    // //空行最多不能超过100行
    // "no-multiple-empty-lines": [0, {"max": 100}],
    // //关闭禁止混用tab和空格
    // "no-mixed-spaces-and-tabs": [0],
  }
}
