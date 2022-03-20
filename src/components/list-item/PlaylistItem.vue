<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-19 23:29:00
 * @FilePath: /cloud-music-v3/src/components/list-item/PlaylistItem.vue
 * @Description: 
-->
<template>
  <li
    class="playlist-item-box"
    :style="style"
  >
    <div class="cover-box">
      <div class="mask" />
      <img
        :src="
          $formatImgSize(playlist.picUrl ?? playlist.coverImgUrl, 1500, 1500)
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
import useFlexStyle from '@/hooks/useFlexStyle'
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
