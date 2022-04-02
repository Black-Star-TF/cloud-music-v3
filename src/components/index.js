/*
 * @Author: BlackStar
 * @Date: 2022-03-31 18:23:52
 * @LastEditTime: 2022-03-31 18:30:47
 * @FilePath: /cloud-music-v3/src/components/index.js
 * @Description: 
 */

import CommonWrapper from '@/components/common/CommonWrapper.vue';
import CommonLoading from '@/components/common/CommonLoading';
import CommonPagination from './common/CommonPagination';
export const registerGlobalComponents = app => {
  app.component('CommonWrapper', CommonWrapper);
  app.component('CommonLoading', CommonLoading);
  app.component('CommonPagination', CommonPagination);
};