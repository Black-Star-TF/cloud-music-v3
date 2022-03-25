<!--
 * @Author: BlackStar
 * @Date: 2022-03-16 23:56:49
 * @LastEditTime: 2022-03-20 16:09:22
 * @FilePath: /cloud-music-v3/src/components/common/CommonWrapper.vue
 * @Description: 
-->
<template>
  <div class="common-wrapper">
    <div class="wrapper-header">
      <div class="left">
        <slot name="left" />
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
    <div class="wrapper-content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="less">
.common-wrapper {
  width: 100%;
  position: relative;
  // overflow: hidden;
  .wrapper-header {
    height: 30px;
    line-height: 30px;
    display: flex;
    margin-bottom: 15px;
    .right {
      margin-left: auto;
    }
  }
}
</style>
