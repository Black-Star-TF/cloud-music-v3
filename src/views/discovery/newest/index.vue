<template>
  <div
    id="newestWrapper"
    class="newest-wrapper"
  >
    <div class="page-box">
      <div class="tab-nav">
        <div
          class="left"
          :class="{ active: currentTab == 'new-song' }"
          @click="switchTab('new-song')"
        >
          新歌速递
        </div>
        <div
          class="right"
          :class="{ active: currentTab == 'new-album' }"
          @click="switchTab('new-album')"
        >
          新碟上架
        </div>
      </div>
      <new-song-tab v-if="currentTab=='new-song'" />
      <new-album-tab
        v-if="currentTab=='new-album'"
        ref="albumTab"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewSongTab from "./new-song/index.vue";
import NewAlbumTab from "./new-album/index.vue";
let currentTab = ref("new-song");
const switchTab = tab => {
  currentTab.value = tab;
};
</script>

<style lang="less" scoped>
.newest-wrapper {
  height: 100%;
  padding: 15px 0;
  overflow: overlay;
  box-sizing: border-box;
  .tab-nav {
    width: 230px;
    height: 30px;
    border-radius: 15px;
    box-sizing: border-box;
    border: 1px solid #bbb;
    font-size: 13px;
    color: #333;
    margin: 0 auto;
    margin-bottom: 15px;
    .left {
      display: inline-block;
      text-align: center;
      width: 114px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
    }
    .right {
      display: inline-block;
      text-align: center;
      width: 114px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
    }
    .left,
    .right {
      &:hover {
        background-color: #f5f5f5;
      }
      &.active {
        background-color: #bbb;
        color: #fff;
      }
    }
  }
}
</style>
