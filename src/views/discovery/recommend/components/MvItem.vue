<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-23 16:18:23
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/components/MvItem.vue
 * @Description: 
-->
<template>
  <div
    class="mv-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img v-lazy="mv.picUrl">
      <span class="play-count">{{ $formatCount(mv.playCount) }}</span>
    </div>
    <div class="name-box">
      <span class="name">{{ mv.name }}</span>
    </div>
    <div class="artist-list">
      <span
        v-for="(artist, idx) in mv.artists"
        :key="artist.id"
      >
        <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
        <i
          v-if="idx < mv.artists.length - 1"
          class="sp"
        > | </i>
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
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.mv-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .box-style(60%);
  .name-box {
    .ellipsis;
  }
  .artist-list {
    .ellipsis;
    font-size: 12px;
    line-height: 15px;
    color: #999;
    span {
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
    .sp {
      color: #333;
    }
  }
}
</style>
