<template>
  <li
    class="playlist-item-box"
    :style="style"
  >
    <div class="cover-box">
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(playlist.picUrl ?? playlist.coverImgUrl, 1000, 1000)
        "
      >
      <span class="play-count">{{ $formatCount(playlist.playCount) }}</span>
      <!-- TODO: 创建人 -->
    </div>
    <div class="name-box">
      <span class="name">{{ playlist.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index'
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 5,
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
.playlist-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .box-style(100%);
  .name-box {
    .ellipsis(2);
  }
}
</style>
