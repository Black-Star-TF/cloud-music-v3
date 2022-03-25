/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-24 22:00:53
 * @FilePath: /cloud-music-v3/src/main.js
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import lazyPlugin from 'vue3-lazy'

// 引入样式文件
import "@/style/global.less"

import { formatCount, formatImgSize, formatDuration } from '@/util/methods'
import CommonPagination from '@/components/common/CommonPagination.vue'

const app = createApp(App)
app.use(lazyPlugin, {
  preLoad: 1.5
})
// 注册全局组件
app.component('CommonPagination', CommonPagination)
// 注册全局方法
app.config.globalProperties.$formatCount = formatCount
app.config.globalProperties.$formatImgSize = formatImgSize
app.config.globalProperties.$formatDuration = formatDuration
app.use(store).use(router).mount('#app')
