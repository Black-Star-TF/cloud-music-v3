/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:21:28
 * @LastEditTime: 2022-03-19 20:18:38
 * @FilePath: /cloud-music-v3/src/router/discoveryRoute/index.js
 * @Description:
 */
import Discovery from "@/views/discovery/index.vue";

const discoveryRoutes = {
  name: "discovery",
  path: "/discovery",
  component: Discovery,
  meta: {
    hasChildren: true,
  },
  children: [
    {
      path: "",
      redirect: "/discovery/recommend",
    },
    {
      path: "recommend",
      component: () => import("@/views/discovery/recommend/index.vue"),
    },
    {
      path: "playlist",
      component: () => import("@/views/discovery/playlist/index.vue"),
    },
    {
      path: "djradio",
      component: () => import("@/views/discovery/djradio/index.vue"),
    },
    {
      path: "toplist",
      component: () => import("@/views/discovery/toplist/index.vue"),
    },
    {
      path: "artist",
      component: () => import("@/views/discovery/artist/index.vue"),
    },
    {
      path: "newest",
      component: () => import("@/views/discovery/newest/index.vue"),
    },
  ],
};

export default discoveryRoutes;
