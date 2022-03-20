/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:21:28
 * @LastEditTime: 2022-03-19 19:22:32
 * @FilePath: /cloud-music-v3/src/router/videoRoute/index.js
 * @Description: 
 */

import Video from '@/views/video/index.vue'
const videoRoute = {
  path: '/v',
  component: Video,
  meta: {
    hasChildren: true
  },
  children: [
    {
      path: '',
      redirect: '/v/video'
    },
    {
      path: 'video',
      component: ()=>import('@/views/discovery/recommend/index.vue')
    },
    {
      path: 'mv',
      component: ()=>import('@/views/discovery/recommend/index.vue')
    },
  ]
}

export default videoRoute