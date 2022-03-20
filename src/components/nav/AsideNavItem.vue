<!--
 * @Author: BlackStar
 * @Date: 2022-03-14 19:48:23
 * @LastEditTime: 2022-03-19 23:39:27
 * @FilePath: /cloud-music-v3/src/components/nav/AsideNavItem.vue
 * @Description: 
-->
<template>
  <li
    class="aside-nav-item"
    :class="{ active: isActive }"
    @click="toPath"
  >
    {{ navItem.name }}
  </li>
</template>

<script setup>
import { computed } from "vue";
import {useRoute, useRouter} from 'vue-router'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
  },
})
const route = useRoute();
const isActive = computed(() => route.fullPath.startsWith(props.navItem.path))

const router = useRouter()
const toPath = () => router.push(props.navItem.path);
</script>

<style lang="less" scoped>
.aside-nav-item {
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding-left: 15px;
  font-size: 13.5px;
  box-sizing: border-box;
  &:hover {
    background-color: var(--app-aside-nav-hover-bg);
  }
  &.active {
    color: #c55247;
    background-color: var(--app-aside-nav-active-bg);
  }
}
</style>
