/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:21:28
 * @LastEditTime: 2022-04-27 18:11:40
 * @FilePath: /cloud-music-v3/src/router/myRoutes/index.js
 * @Description: 
 */
const myRoutes = [
  {
    path: '/my/download',
    meta: {
      hasChildren: true
    },
    component: ()=> import("@/views/my-download/index.vue"),
    children: [
      {
        path: '',
        redirect: "/my/download/single"
      },
      {
        path: 'single',
        component: ()=>import('@/views/my-download/single/index.vue')
      },
      {
        path: 'program',
        component: ()=>import('@/views/my-download/program/index.vue')
      },
      {
        path: 'downloading',
        component: ()=>import('@/views/my-download/downloading/index.vue')
      },
    ]
  },
  {
    path: '/my/recent',
    meta: {
      title: "最近播放"
    },
    component: ()=> import("@/views/my-recent/index.vue")
  },
  {
    path: '/my/cloud',
    alias: '/download/downloading',
    meta: {
      title: "我的音乐云盘"
    },
    component: ()=> import("@/views/my-cloud/index.vue")
  },
  {
    path: '/my/radio',
    meta: {
      title: "我的电台"
    },
    component: ()=> import("@/views/my-radio/index.vue")
  },
  {
    path: '/my/favorite',
    meta: {
      hasChildren: true
    },
    component: ()=> import("@/views/my-favorite/index.vue"),
    children: [
      {
        path: '',
        redirect: "/my/favorite/album"
      },
      {
        path: 'album',
        component: ()=>import('@/views/my-favorite/album/index.vue')
      },
      {
        path: 'artist',
        component: ()=>import('@/views/my-favorite/artist/index.vue')
      },
      {
        path: 'video',
        component: ()=>import('@/views/my-favorite/video/index.vue')
      },
      {
        path: 'topic',
        component: ()=>import('@/views/my-favorite/topic/index.vue')
      },
    ]
  },
  {
    path: '/my/playlist',
    component: ()=>import('@/views/discovery/recommend/index.vue')
  }
];

export default myRoutes;
