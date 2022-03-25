<!--
 * @Author: BlackStar
 * @Date: 2022-03-21 15:12:14
 * @LastEditTime: 2022-03-24 21:57:50
 * @FilePath: /cloud-music-v3/src/views/discovery/artist/components/ArtistItem.vue
 * @Description: 
-->
<template>
  <li
    class="artist-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="
          $formatImgSize(artist.img1v1Url, 500, 500)
        "
      >
    </div>
    <div class="name-box">
      <span class="name">{{ artist.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index'
const props = defineProps({
  artist: {
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
.artist-item-box {
  margin-bottom: 15px;
  box-sizing: border-box;
  .box-style(100%);
  .name-box {
    .ellipsis;
    font-size: 13px;
  }
}
</style>
