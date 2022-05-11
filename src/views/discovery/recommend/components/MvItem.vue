<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-05-11 14:16:14
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/components/MvItem.vue
 * @Description: 
-->
<template>
  <div
    class="mv-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="mv.picUrl"
        class="cover"
      >
      <span class="play-count">
        <span class="iconfont icon-pause icon" />{{ $formatCount(mv.playCount) }}
      </span>
    </div>
    <div class="name-box ellipsis1">
      <span class="name">{{ mv.name }}</span>
    </div>
    <div class="artists-box ellipsis1">
      <span
        v-for="(artist, idx) in mv.artists"
        :key="artist.id"
      >
        <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
        <i
          v-if="idx < mv.artists.length - 1"
          class="sp"
        >|</i>
      </span>
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
const toArtistDetail = id => {
  console.log(id);
};
</script>

<style lang="less" scoped>
.mv-item-box {
  --margin-top: 60%;
}
</style>
