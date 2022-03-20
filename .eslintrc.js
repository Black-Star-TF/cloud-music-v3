/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-19 20:13:39
 * @FilePath: /cloud-music-v3/.eslintrc.js
 * @Description: 
 */
module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
  }
}
