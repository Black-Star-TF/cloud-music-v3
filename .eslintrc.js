/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-31 14:11:24
 * @FilePath: /cloud-music-v3/.eslintrc.js
 * @Description: 
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    "vue/setup-compiler-macros": true
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    "prettier",
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      "jsx": true,
    }
  },
  rules: {
    'vue/script-setup-uses-vars': 'error',
    "semi": "error",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    "vue/no-v-html": 0,
    "vue/html-indent": 2,
    "vue/no-unused-components": 2,  // 有注册但未使用的组件
    "vue/no-unused-vars": 2,        // 有定义但未使用的变量
    "vue/no-use-v-if-with-v-for": 2, // v-if 和 v-for 同时使用
    // "vue/no-useless-template-attributes": 2,
    "vue/attribute-hyphenation": 2,
    "vue/html-closing-bracket-newline": 2,
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },      
      "multiline": {
        "max": 1
      }
    }],
    "vue/singleline-html-element-content-newline": [2, {
      ignoreWhenNoAttributes: false
    }],
    "vue/require-explicit-emits": 2,
    "vue/attributes-order": 2,
    "vue/block-tag-newline": 2,
    "vue/component-api-style": 2,
  }
};
