<template>
  <li
    class="song-item-box"
    :style="style"
  >
    <div class="mask" />
    <img
      v-lazy="$formatImgSize(song.album.picUrl, 120, 120)"
      class="cover-box"
    >
    <div class="index-box">
      {{ index > 9 ? index : `0${index}` }}
    </div>
    <div class="info-box">
      <span class="name">
        {{ song.name }}
        <span
          v-if="song?.alias.length > 0"
          class="alia"
        >
          （{{ song.alias[0] }}）
        </span>
      </span>
      <span class="artist-list">
        <span
          v-for="(artist, idx) in song.artists"
          :key="artist.id"
        >
          <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
          <i
            v-if="idx < song.artists.length - 1"
            class="sp"
          > | </i>
        </span>
      </span>
    </div>
    <div class="mv-box">
      <!-- <span v-if="song.mvid">mv</span> -->
      <!-- TODO:mv图标 -->
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from "@/hooks/index";
const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 2,
  },
  index: {
    type: Number,
    required: true,
  },
  marginRight: {
    type: Number,
    default: 40,
  },
});
let style = useFlexStyle(props, 10);
const toArtistDetail = id => {
  console.log(id);
};
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.song-item-box {
  height: 80px;
  border-top: 0.5px solid #f7f7f7;
  border-bottom: 0.5px solid #f7f7f7;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  overflow: visible;
  &:hover {
    .mask {
      visibility: visible;
    }
  }
  .mask {
    visibility: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -10px;
    right: -10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    z-index: 0;
  }
  .cover-box {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
  }
  .index-box {
    width: 30px;
    text-align: center;
    z-index: 1;
    color: #bbb;
    font-size: 12px;
  }
  .info-box {
    flex: 1;
    height: 60px;
    z-index: 1;
    overflow: hidden;
    .name {
      margin-top: 15px;
      margin-bottom: 5px;
      width: 100%;
      height: 15px;
      .ellipsis;
      line-height: 15px;
      font-size: 13.5px;
      color: #333;
      box-sizing: border-box;
      .alia{
        color: #999;
      }
    }
    .artist-list {
      .ellipsis;
      font-size: 12px;
      line-height: 15px;
      color: #666;
      span {
        cursor: pointer;
        &:hover {
          color: #333;
        }
      }
      .sp {
        color: #999;
      }
    }
  }
  .mv-box {
    width: 55px;
    height: 60px;
  }
}
</style>
