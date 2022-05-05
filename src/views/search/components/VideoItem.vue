<template>
  <li
    class="video-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="$formatCount(video.coverUrl, 1000, 560)"
      >
      <span class="play-count">
        <span class="iconfont icon-pause pause" />{{ $formatCount(video.playTime) }}
      </span>
    </div>
    <div class="name-box">
      <span
        v-if="video.type === 0"
        class="iconfont icon-mv mv"
      />
      <span
        class="name"
        v-html="markKeywords(video.title,keywords)"
      />
    </div>
    <div
      v-if="isMV"
      class="artists-box"
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
@import url("~@/style/common-mixins.less");
.video-item-box {
  margin-bottom: 40px;
  .cover-box {
    width: 100%;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    &::after {
      content: "";
      display: block;
      width: 100%;
      margin-top: 56%;
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
      .pause{
        font-size: 12px;
        position: relative;
        margin-right: 3px;
      }
    }
  }
  .name-box {
    margin: 5px 0;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .mv{
      color: #c3473a;
      font-size: 27px;
      margin-right: 5px;
    }
    .name {
      .ellipsis;
      color: #333;
      &:hover {
        color: #000;
      }
    }
  }
  .artists-box {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: #999;
    .ellipsis;
    span{
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
    .sp {
      color: #999;
      margin: 0 5px
    }
  }
  .creator-box{
    .ellipsis;
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: #999;
    span {
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>
