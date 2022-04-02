<template>
  <li
    class="private-content-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img v-lazy="$formatImgSize(privateContent.sPicUrl, 800, 200)">
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
    default: 4,
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
  .box-style(40%); // 比例
  .name-box{
    .ellipsis_rows(2);
  }
}
</style>
