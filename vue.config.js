/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:14:48
 * @LastEditTime: 2022-03-19 20:06:20
 * @FilePath: /cloud-music-v3/vue.config.js
 * @Description: 
 */

module.exports = {
  devServer: {
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