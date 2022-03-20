<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:20:31
 * @LastEditTime: 2022-03-19 20:27:25
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/index.vue
 * @Description: 
-->
<!--
 * @Author: BlackStar
 * @Date: 2022-03-14 21:31:07
 * @LastEditTime: 2022-03-19 18:30:57
 * @FilePath: /cloud-music-v3-ts/src/views/discovery/recommend/index.vue
 * @Description: 
-->
<template>
  <div class="recommend-wrapper">
    <!-- 轮播图 -->
    <slider-show
      v-if="banners.length > 0"
      :data="banners"
    />
    <!-- 推荐歌单 -->
    <common-wrapper>
      <template #left>
        <span class="section-title">推荐歌单</span>
      </template>
      <template #content>
        <ul class="flex-box">
          <playlist-item
            v-for="(playlist, index) in playlists"
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
        <span class="section-title">独家放送</span>
      </template>
      <template #content>
        <ul class="flex-box">
          <private-content-item
            v-for="(privateContent, index) in privateContents"
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
        <span class="section-title">最新音乐</span>
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
        <span class="section-title">推荐MV</span>
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
</template>

<script setup>
import {  reactive } from "vue";
import {
  getRecommendBanner,
  getRecommendPlaylist,
  getRecommendSongs,
  getRecommendPrivateContents,
  getRecommendMVs,
} from "@/api/recommend";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import SliderShow from "@/components/common/SliderShow.vue";
import PlaylistItem from "@/components/list-item/PlaylistItem.vue";
import PrivateContentItem from "@/components/list-item/PrivateContentItem.vue";
import SongItem from "@/components/list-item/SongItem.vue";
import MvItem from "@/components/list-item/MvItem.vue";

// =====轮播图数据及相关操作
let banners = reactive([]);
async function getBanners() {
  const { banners: bannerData } = await getRecommendBanner("0");
  banners.push(...bannerData);
}
getBanners();

// =====推荐歌单数据
let playlists = reactive([]);
async function getPlaylists() {
  const { result } = await getRecommendPlaylist(10);
  playlists.push(...result);
}
getPlaylists();

// =====独家放送
let privateContents = reactive([]);
async function getPrivateContents() {
  const { result } = await getRecommendPrivateContents();
  privateContents.push(...result);
}
getPrivateContents();

// =====推荐新音乐
let songs = reactive([]);
async function getSongs() {
  const { result } = await getRecommendSongs(10);
  result.forEach((item) => {
    songs.push(item.song);
  });
}
getSongs();

// =====推荐MV
let mvs = reactive([]);
async function getMVs() {
  const { result } = await getRecommendMVs();
  mvs.push(...result);
}
getMVs();
</script>

<style lang="less" scoped>
.recommend-wrapper {
  height: 100%;
  overflow: overlay;
  // max-width: 1330px;
  padding: 0 30px;
  .section-title {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    &:hover {
      color: #000000;
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
