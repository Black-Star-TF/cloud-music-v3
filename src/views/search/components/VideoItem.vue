<template>
  <li
    class="video-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="$formatCount(video.coverUrl, 1000, 560)"
        class="cover"
      >
      <span class="play-count">
        <span class="iconfont icon-pause icon" />{{ $formatCount(video.playTime) }}
      </span>
    </div>
    <div class="name-tag-box">
      <span
        v-if="video.type === 0"
        class="iconfont icon-mv mv"
      />
      <span
        class="name ellipsis1"
        v-html="markKeywords(video.title,keywords)"
      />
    </div>
    <div
      v-if="isMV"
      class="artists-box ellipsis1"
    >
      <template
        v-for="(artist, idx) in video.creator"
        :key="artist.userId"
      >
        <span
          @click="toArtistDetail(artist.userId)"
          v-html="markKeywords(artist.userName,keywords)"
        />
        <i
          v-if="idx < video.creator.length - 1"
          class="sp"
        >|</i>
      </template>
    </div>
    <div
      v-else
      class="creator-box"
    >
      by <span v-html="markKeywords(video.creator[0].userName,keywords)" />
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { markKeywords } from "@/util/methods";
import { useFlexStyle } from "@/hooks/index";
const props = defineProps({
  video: {
    type: Object,
    default: () => ({
      artists: [],
    }),
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
  keywords: {
    type: String,
    default: "",
  },
});

const isMV = computed(() => props.video.type === 0);

let style = useFlexStyle(props);
const toArtistDetail = id => {
  console.log(id);
};
</script>

<style lang="less" scoped>
.video-item-box {
  --margin-top: 56%;
  margin-bottom: 30px;
}
</style>
