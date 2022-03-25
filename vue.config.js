/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:14:48
 * @LastEditTime: 2022-03-23 14:30:45
 * @FilePath: /cloud-music-v3/vue.config.js
 * @Description: 
 */

module.exports = {
  devServer: {
    open: true,
    port: 9998,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}