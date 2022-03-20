<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:11:46
 * @LastEditTime: 2022-03-19 19:29:53
 * @FilePath: /cloud-music-v3/src/App.vue
 * @Description: 
-->
<template>
  <app-header />
  <router-view />
</template>
<script setup>
import {onMounted} from 'vue'
import AppHeader from "@/components/layout/AppHeader.vue";
onMounted(()=> document.body.setAttribute('data-theme','light'))
</script>
<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  // min-height
  min-width: 1000px;
  overflow: auto;
}
</style>