<template>
  <div
    class="mv-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-if="mv.id"
        v-lazy="mv.cover"
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
      <template
        v-for="(artist, idx) in mv.artists"
        :key="artist.id"
      >
        <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
        <i
          v-if="idx < mv.artists.length - 1"
          class="sp"
        > | </i>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
const props = defineProps({
  mv: {
    type: Object,
    default: () => ({
      artists: []
    })
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
  margin-bottom: 30px;
  --margin-top: 60%;
}
</style>
