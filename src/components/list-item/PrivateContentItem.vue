<!--
 * @Author: BlackStar
 * @Date: 2022-03-17 14:17:02
 * @LastEditTime: 2022-03-19 23:29:17
 * @FilePath: /cloud-music-v3/src/components/list-item/PrivateContentItem.vue
 * @Description: 
-->
<template>
  <li
    class="private-content-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img :src="privateContent.picUrl">
    </div>
    <div class="name-box">
      <span class="name">{{ privateContent.name }}</span>
    </div>
  </li>
</template>

<script setup>
import useFlexStyle from '@/hooks/useFlexStyle'
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
  .box-style(45%); // 比例
  .name-box{
    .ellipsis(2);
  }
}
</style>
