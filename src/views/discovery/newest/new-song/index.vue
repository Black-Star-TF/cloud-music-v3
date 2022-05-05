<template>
  <common-wrapper class="new-song-tab-wrapper">
    <template #left>
      <area-selector
        v-model:current-area="currentArea"
        :area-list="areaList"
        @area-change="handleAreaChange"
      ></area-selector>
    </template>
    <template #right>
      <button class="play-all">
        播放全部
      </button>
      <button class="like-all">
        收藏全部
      </button>
    </template>
    <template #content>
      <ul class="song-list">
        <song-item
          v-for="(song, index) in list"
          :key="song.id"
          :song="song"
          :index="index + 1"
        />
      </ul>
      <common-loading v-if="loading" />
    </template>
  </common-wrapper>
</template>

<script setup>
import AreaSelector from "../components/AreaSelector";
import SongItem from "../components/SongItem.vue";
import useData from "./index";
const { 
  areaList,
  currentArea, 
  loading, 
  list, 
  handleAreaChange,
} = useData();
</script>

<style lang="less" scoped>
.new-song-tab-wrapper {
  .play-all,
  .like-all {
    font-size: 13px;
    width: 90px;
    height: 24px;
    border-radius: 12px;
    text-align: center;
  }
  .play-all {
    color: #fff;
    background: linear-gradient(to right, #e85e4d, #c3473a);
  }
  .like-all {
    color: #333;
    border: 1px solid #ddd;
    margin-left: 10px;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
