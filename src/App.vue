<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-27 11:55:55
 * @FilePath: /cloud-music-v3/src/App.vue
 * @Description: 
-->
<template>
  <app-header />
  <router-view />
  <teleport to="body">
    <search-drawer
      :visible="searchDrawerVisible"
      @open="openSearchDrawer"
      @close="closeSearchDrawer"
    />
  </teleport>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import AppHeader from "@/components/layout/AppHeader.vue";
import SearchDrawer from "@/views/search-drawer/index.vue";
onMounted(() => document.body.setAttribute("data-theme", "light"));

const store = useStore();
const searchDrawerVisible = computed(() => store.state.app.searchDrawerVisible);

const openSearchDrawer = () => store.commit("app/openSearchDrawer");
const closeSearchDrawer = () => store.commit("app/closeSearchDrawer");
</script>
<style lang="less">
body{
  // filter: grayscale(100%);
}
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  // min-height
  min-width: 1000px;
  overflow: auto;
}
</style>
