<template>
  <div
    class="exclusive-mv-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="mv.cover"
        class="cover"
      >
      <span class="play-count">
        <span class="iconfont icon-pause icon" />{{ $formatCount(mv.playCount) }}
      </span>
    </div>
    <div class="name-box ellipsis2">
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
.exclusive-mv-item-box{
  margin-bottom: 30px;
  --margin-top: 60%;
}
</style>
