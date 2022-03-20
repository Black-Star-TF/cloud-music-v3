/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-19 20:19:11
 * @FilePath: /cloud-music-v3/src/main.js
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入样式文件
import "@/style/global.less"

import {formatCount,formatImgSize} from '@/util/methods'
import CommonPagination from '@/components/common/CommonPagination.vue'

const app = createApp(App)
// 注册全局组件
app.component('CommonPagination',CommonPagination)
// 注册全局方法
app.config.globalProperties.$formatCount = formatCount
app.config.globalProperties.$formatImgSize = formatImgSize
app.use(store).use(router).mount('#app')
