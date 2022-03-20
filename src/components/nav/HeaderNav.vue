<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-19 23:38:57
 * @FilePath: /cloud-music-v3/src/components/nav/HeaderNav.vue
 * @Description: 
-->
<template>
  <ul class="header-nav-wrapper">
    <li
      v-for="nav in subNavList"
      :key="nav.path"
      class="nav-item"
      :class="{'active': getActive(nav.path)}"
      @click="toPath(nav.path)"
    >
      {{ nav.name }}
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  subNavList: {
    type: Array,
    required: true,
  },
})
const route = useRoute()
const parentPath = computed(() => route.matched[1].path)
const router = useRouter()
const getActive = path => route.fullPath == `${parentPath.value}/${path}`
const toPath = path => router.push(`${parentPath.value}/${path}`)
</script>

<style lang="less" scoped>
.header-nav-wrapper {
  height: 100%;
  align-self: flex-start;
  display: flex;
  align-items: center;
  font-size: 14px;
  .nav-item {
    color: var(--app-header-color);
    font-weight: 400;
    &:hover{
      color: var(--app-header-hover-color);
      font-weight: 600;
    }
    &.active{
      color: var(--app-header-active-color);
      font-weight: 600;
    }

    &:not(last-of-type) {
      margin-left: 30px;
    }
  }
}
</style>
