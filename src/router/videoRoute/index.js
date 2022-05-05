/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:21:28
 * @LastEditTime: 2022-05-05 11:29:45
 * @FilePath: /cloud-music-v3/src/router/videoRoute/index.js
 * @Description: 
 */

import Video from '@/views/video/index.vue';
const videoRoute = {
  path: '/v',
  component: Video,
  meta: {
    hasChildren: true
  },
  redirect: '/video',
  children: [
    {
      path: '/video',
      component: ()=>import('@/views/video/video/index.vue')
    },
    {
      path: '/mv',
      component: ()=>import('@/views/video/mv/index.vue')
    },
  ]
};

export default videoRoute;