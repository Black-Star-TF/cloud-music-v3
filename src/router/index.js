import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/main/index.vue";
import VideoDetail from "@/views/video-detail/index.vue";
import discoveryRoutes from "./discoveryRoute";
import videoRoute from "./videoRoute";
import myRoutes from "./myRoutes";

const routes = [
  {
    path: "/",
    component: Main,
    redirect: "/discovery",
    children: [
      // 发现页
      discoveryRoutes,
      {
        path: "/friend",
        meta: {
          title: "动态",
        },
        component: () => import("@/views/friend/index.vue"),
      },
      {
        path: "/fm",
        component: () => import("@/views/private-fm/index.vue"),
      },
      // 视频页
      videoRoute,
      ...myRoutes,
      {
        path: "/playlist/:id",
        component: () => import("@/views/private-fm/index.vue"),
      },
    ],
  },
  // 视频详情页
  {
    path: "/video/detail/:id",
    component: VideoDetail,
    props: true, // VideoDetail组件中可以使用props id获取路由参数
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
