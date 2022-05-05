<template>
  <div class="recommend-wrapper">
    <div
      v-if="!loading"
      class="page-box"
    >
      <!-- 轮播图 -->
      <slider-show
        v-if="banners.length > 0"
        :data="banners"
      />
      <!-- 推荐歌单 -->
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toPlaylist"
          >推荐歌单</span>
        </template>
        <template #content>
          <ul class="flex-box">
            <playlist-item
              v-for="(playlist,index) in playlists"
              :key="playlist.id"
              :playlist="playlist"
              :column="5"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <!-- 独家放送 -->
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click=" toPrivateContent"
          >独家放送</span>
        </template>
        <template #content>
          <ul class="flex-box">
            <private-content-item
              v-for="(privateContent,index) in privateContents"
              :key="privateContent.id"
              :private-content="privateContent"
              :column="3"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toNewestMusic"
          >最新音乐</span>
        </template>
        <template #content>
          <ul class="flex-box margin-bottom">
            <song-item
              v-for="(song, index) in songs"
              :key="song.id"
              :song="song"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toMV"
          >推荐MV</span>
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-item
              v-for="(mv, index) in mvs"
              :key="mv.id"
              :mv="mv"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
    </div>
    <common-loading v-else />
  </div>
</template>

<script setup>
import SliderShow from '@/components/common/SliderShow.vue';
import PlaylistItem from './components/PlaylistItem.vue';
import PrivateContentItem from './components/PrivateContentItem.vue';
import SongItem from './components/SongItem.vue';
import MvItem from './components/MvItem.vue';
import useData from './index';

const {
  banners,
  playlists,
  privateContents,
  songs,
  mvs,
  loading,
  toPlaylist,
  toNewestMusic,
  toPrivateContent,
  toMV,
} = useData();
</script>

<style lang="less" scoped>
.recommend-wrapper {
  height: 100%;
  overflow: overlay;
  .section-title {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    &:hover {
      color: #000;
    }
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    &.margin-bottom {
      margin-bottom: 40px;
    }
  }
}
</style>
