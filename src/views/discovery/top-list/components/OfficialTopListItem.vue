<template>
  <li class="official-top-list-item-box">
    <div
      class="cover-box"
      @click="handleClick"
    >
      <img v-lazy="$formatImgSize(topList.coverImgUrl)">
    </div>

    <div class="info-box">
      <div
        v-if="loading"
        class="loading-mask"
      >
        <common-loading />
      </div>
      <ul class="song-list">
        <li
          v-for="(song, index) in songList"
          :key="song.id"
          class="song-item"
        >
          <span class="index">{{ index + 1 }}</span>
          <span class="name">
            {{ song.name }}
            <span
              v-if="song.tns?.length > 0"
              class="tns"
            >
              （{{ song.tns[0] }}）
            </span>
            <span
              v-else-if="song.alia?.length > 0"
              class="alia"
            >
              （{{ song.alia[0] }}）
            </span>
          </span>
          <span class="artist-list ellipsis1">
            <span
              v-for="(artist, idx) in song.ar"
              :key="artist.id"
            >
              <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
              <i
                v-if="idx < song.ar.length - 1"
                class="sp"
              > | </i>
            </span>
          </span>
        </li>
      </ul>
      <span
        v-if="!loading"
        class="more"
      >查看全部</span>
    </div>
  </li>
</template>

<script setup>
import { playlistApi } from "@/api";
import { ref, reactive } from "@vue/reactivity";
const props = defineProps({
  topList: {
    type: Object,
    required: true,
  },
});

let loading = ref(true);
let songList = reactive([]);
const getSong = async () => {
  const {songs} = await playlistApi.songList({ id: props.topList.id });
  songList.push(...songs.slice(0, 5));
  loading.value = false;
};
getSong();

const handleClick = () => {
  console.log(props.topList.id);
};
const toArtistDetail = id => {
  console.log(id);
};
</script>

<style lang="less" scoped>
.official-top-list-item-box {
  display: flex;
  height: 200px;
  margin-bottom: 25px;
  .cover-box {
    width: 175px;
    height: 175px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info-box {
    flex: 1;
    position: relative;
    .loading-mask{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 175px;
      z-index: 2;
      background-color: rgba(255,255,255,.2);
      display: flex;
      align-items: center;
      border: 1px solid #f2f2f2;
    }
    .song-list {
      height: 175px;
      .song-item {
        height: 35px;
        line-height: 35px;
        display: flex;
        border-radius: 5px;
        overflow: hidden;
        font-size: 12px;
        &:nth-child(2n + 1) {
          background-color: #fafafa;
        }
        &:hover {
          background-color: #f5f5f5;
        }
        .index {
          display: inline;
          margin: 0 15px;
          color: #999;
          &.top {
            color: #c3473a;
          }
        }
        .name {
          color: #333;
          .alia, .tns{
            color: #666;
          }
        }

        .artist-list {
          height: 35px;
          margin-left: auto;
          margin-right: 10px;
          line-height: 35px;
          color: #999;
          span {
            cursor: pointer;
            &:hover {
              color: #666;
            }
          }
        }
      }
    }
    .more {
      display: inline-block;
      line-height: 15px;
      font-size: 12px;
      color: #666;
      margin: 10px 15px 0;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
