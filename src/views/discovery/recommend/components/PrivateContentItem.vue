<!--
 * @Author: BlackStar
 * @Date: 2022-03-17 14:17:02
 * @LastEditTime: 2022-03-24 22:22:39
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/components/PrivateContentItem.vue
 * @Description: 
-->
<template>
  <li
    class="private-content-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img v-lazy="privateContent.sPicUrl">
    </div>
    <div class="name-box">
      <span class="name">{{ privateContent.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index'
const props = defineProps({
  privateContent: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 3,
  },
  index: {
    type: Number,
    required: true,
  },
  marginRight: {
    type: Number,
    default: 20,
  },
})
let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.private-content-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .box-style(56%); // 比例
  .name-box{
    .ellipsis(2);
  }
}
</style>
