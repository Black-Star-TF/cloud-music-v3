<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:20:31
 * @LastEditTime: 2022-03-19 20:00:57
 * @FilePath: /cloud-music-v3/src/views/main/index.vue
 * @Description: 
-->
<!--
 * @Author: BlackStar
 * @Date: 2022-03-14 15:43:32
 * @LastEditTime: 2022-03-17 14:12:53
 * @FilePath: /cloud-music-v3-ts/src/views/main/index.vue
 * @Description: 
-->
<template>
  <div class="app-main">
    <app-aside />
    <div class="app-content">
      <router-view />
    </div>
  </div>
  <app-footer />
</template>

<script>
import AppAside from "@/components/layout/AppAside.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

// import {  } from "vue";
export default {
  name: "Main",
  components: {
    AppAside,
    AppFooter,
  },
};
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 110px);
  display: flex;
  background-color: var(--app-content-bg);
  .app-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    ::-webkit-scrollbar-thumb {
      background-color: var(--app-content-scroll-bg);
    }
  }
}
</style>
