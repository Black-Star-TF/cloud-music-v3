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
          <span
            class="section-title"
            @click="toPrivateContent"
          >独家放送</span>
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
import { ref,reactive } from "vue";
import { useRouter } from 'vue-router'
import {
  getRecommendBanner,
  getRecommendPlaylist,
  getRecommendSongs,
  getRecommendPrivateContents,
  getRecommendMVs,
} from "@/api/recommend";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import SliderShow from "@/components/common/SliderShow.vue";
import PlaylistItem from "./components/PlaylistItem.vue";
import PrivateContentItem from "./components/PrivateContentItem.vue";
import SongItem from "./components/SongItem.vue";
import MvItem from "./components/MvItem.vue";
import CommonLoading from '@/components/common/CommonLoading'

// =====轮播图数据及相关操作
let banners = reactive([]);
async function getBanners() {
  const { banners: bannerData } = await getRecommendBanner("0");
  banners.push(...bannerData);
}


// =====推荐歌单数据
let playlists = reactive([]);
async function getPlaylists() {
  const { result } = await getRecommendPlaylist(10);
  playlists.push(...result);
}

// =====独家放送
let privateContents = reactive([]);
async function getPrivateContents() {
  const { result } = await getRecommendPrivateContents();
  privateContents.push(...result);
}

// =====推荐新音乐
let songs = reactive([]);
async function getSongs() {
  const { result } = await getRecommendSongs(10);
  result.forEach((item) => {
    songs.push(item.song);
  });
}

// =====推荐MV
let mvs = reactive([]);
async function getMVs() {
  const { result } = await getRecommendMVs();
  mvs.push(...result);
}

let loading = ref(true)
Promise.all([getBanners(),getPlaylists(),getPrivateContents(),getSongs(), getMVs()]).then(() => {
  loading.value = false
})

const router = useRouter()

const toPlaylist = () => {
  router.push('/discovery/playlist')
}

const toNewestMusic = () => {
  router.push('/discovery/newest')
}

const toPrivateContent = () => {
  router.push('/private-content')
}

const toMV = () => {
  router.push('/v/mv')
}

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
