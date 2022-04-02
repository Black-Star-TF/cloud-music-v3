<template>
  <li
    class="playlist-item-box"
    @click="toPlaylistDetail(playlist.id)"
  >
    <div class="cover-box">
      <img
        :src="$formatImgSize(playlist.coverImgUrl, 100, 100)"
        class="cover"
      >
    </div>
    <div class="name-box">
      <span
        class="name"
        v-html="markKeywords(playlist.name, keywords)"
      />
    </div>
    <div class="count-box">
      {{ playlist.trackCount }}首
    </div>
    <div class="creator-box">
      by
      <span
        class="creator"
        @click.stop
        v-html="markKeywords(playlist.creator.nickname, keywords)"
      />
    </div>
  </li>
</template>

<script setup>
import { markKeywords, toPlaylistDetail } from "@/util/methods";
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
  keywords: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.playlist-item-box {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
  cursor: pointer;
  &:nth-child(2n) {
    background-color: #fafafa;
  }
  &:hover {
    background-color: #f2f2f2;
  }
  .cover-box {
    width: 60px;
    height: 60px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    margin-right: 15px;
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .name-box {
    flex: 7;
    font-size: 14px;
    line-height: 15px;
    .ellipsis;
    .name {
      color: #333;
      &:hover {
        color: #000;
      }
    }
  }
  .count-box {
    flex: 2;
    font-size: 12px;
    color: #ddd;
  }
  .creator-box {
    flex: 3;
    .ellipsis;
    font-size: 12px;
    color: #bbb;
    .creator {
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
