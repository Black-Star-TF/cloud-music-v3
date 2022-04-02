/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-31 18:31:04
 * @FilePath: /cloud-music-v3/src/main.js
 * @Description: 
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerGlobalComponents } from '@/components/index';

import lazyPlugin from 'vue3-lazy';

// 引入样式文件
import "@/style/global.less";

import { formatCount, formatImgSize, formatDuration } from '@/util/methods';

const app = createApp(App);
app.use(lazyPlugin, {
  preLoad: 1.5
});
// 注册全局组件
registerGlobalComponents(app);
// 注册全局方法
app.config.globalProperties.$formatCount = formatCount;
app.config.globalProperties.$formatImgSize = formatImgSize;
app.config.globalProperties.$formatDuration = formatDuration;
app.use(store).use(router).mount('#app');
