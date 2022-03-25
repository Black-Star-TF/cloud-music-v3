<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-24 21:22:25
 * @FilePath: /cloud-music-v3/src/components/layout/AppHeader.vue
 * @Description: 
-->
<template>
  <div class="app-header">
    <div class="left" />
    <header-nav
      v-if="hasChildren"
      :sub-nav-list="subNavList"
    />
    <header-title v-else-if="title">
      {{ title }}
    </header-title>
    <div class="right" />
  </div>
</template>

<script setup>
import { computed  } from "vue";
import {useRoute} from 'vue-router'
import HeaderTitle from "@/components/nav/HeaderTitle.vue"
import HeaderNav from "@/components/nav/HeaderNav.vue";
import subNavDisc from "@/common/config/sub-nav-disc";
const route = useRoute()

const hasChildren = computed(() => !!route.meta.hasChildren)
const title = computed(() => route.meta.title ?? "")
const subNavList = computed(() => {
  if (hasChildren.value) {
    return subNavDisc[route.matched[1].path];
  } else {
    return [];
  }
})
</script>

<style lang="less" scoped>
.app-header {
  height: 50px;
  display: flex;
  background-color: var(--app-header-bg);
  .left {
    height: 100%;
    width: var(--app-aside-width);
    background-color: var(--app-header-left-bg);
  }
  .right {
    margin-left: auto;
    width: 300px;
    height: 100%;
  }
}
</style>
