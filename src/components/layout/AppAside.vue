<!--
 * @Author: BlackStar
 * @Date: 2022-03-14 15:22:18
 * @LastEditTime: 2022-03-19 22:55:30
 * @FilePath: /cloud-music-v3/src/components/layout/AppAside.vue
 * @Description: 
-->
<template>
  <div class="app-aside">
    <!-- 用户头像 -->
    <div class="user-box" />
    <ul class="nav-list">
      <aside-nav-item
        v-for="navItem in commonNavList"
        :key="navItem.path"
        :nav-item="navItem"
      />
      <div class="type-title">
        我的音乐
      </div>
      <aside-nav-item
        v-for="navItem in myMusicNavList"
        :key="navItem.path"
        :nav-item="navItem"
      />
      <div class="type-title">
        创建的歌单
      </div>
      <div class="type-title">
        收藏的歌单
      </div>
    </ul>
  </div>
</template>

<script setup>
// import {  } from "vue";
import AsideNavItem from "@/components/nav/AsideNavItem.vue";
import {
  commonNavList,
  myMusicNavList,
} from "@/common/constant/aside-nav-list.js";

</script>

<style lang="less" scoped>
.app-aside {
  width: 200px;
  height: 100%;
  background-color: var(--app-aside-bg);
  ::-webkit-scrollbar-thumb {
    background-color: var(--app-aside-scroll-bg);
  }
  .user-box {
    height: 60px;
  }
  .nav-list {
    height: calc(100% - 60px);
    padding-right: 8px;
    .type-title {
      font-size: 12px;
      padding-left: 15px;
      height: 22px;
      margin-top: 15px;
    }
  }
}
</style>
