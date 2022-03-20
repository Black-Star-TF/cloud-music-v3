<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-19 20:18:02
 * @FilePath: /cloud-music-v3/src/components/nav/HeaderTitle.vue
 * @Description: 
-->
<template>
  <div class="header-title-wrapper">
    <div class="title">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-title-wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  .title{
    font-size: 14px;
    margin-left: 30px;
    font-weight: 600;
    color: var(--app-header-active-color);
  }
}
</style>
