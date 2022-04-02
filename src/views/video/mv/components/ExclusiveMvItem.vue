<template>
  <div
    class="exclusive-mv-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img v-lazy="mv.cover">
      <span class="play-count">{{ $formatCount(mv.playCount) }}</span>
    </div>
    <div class="name-box">
      <span class="name">{{ mv.name }}</span>
    </div>
  </div>
</template>

<script setup>
import {useFlexStyle} from "@/hooks/index";
const props = defineProps({
  mv: {
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
});

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.exclusive-mv-item-box{
  margin-bottom: 30px;
  .cover-box{
    width: 100%;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    &::after {
      content: "";
      display: block;
      width: 100%;
      margin-top: 60%;
    }
    img {
      position: absolute;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .play-count {
      position: absolute;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      top: 0;
      right: 10px;
      color: #fff;
      z-index: 3;
    }
  }
  .name-box{
    margin-top: 5px;
    line-height: 20px;
    min-height: 20px;
    font-size: 14px;
    .ellipsis_rows(2);
    .name {
      color: #333;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
