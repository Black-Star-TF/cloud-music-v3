<!--
 * @Author: BlackStar
 * @Date: 2022-03-21 15:12:14
 * @LastEditTime: 2022-05-11 14:33:24
 * @FilePath: /cloud-music-v3/src/views/discovery/artist/components/ArtistItem.vue
 * @Description: 
-->
<template>
  <li
    class="artist-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="
          $formatImgSize(artist.img1v1Url, 500, 500)
        "
        class="cover"
      >
    </div>
    <div class="name-box ellipsis1">
      <span class="name">{{ artist.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index';
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
});

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
.artist-item-box {
  margin-bottom: 15px;
}
</style>
