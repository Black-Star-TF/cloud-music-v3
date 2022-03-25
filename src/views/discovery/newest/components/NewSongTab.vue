<template>
  <common-wrapper class="new-song-tab-wrapper">
    <template #left>
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          :class="{ active: category.id == currentCategoryId }"
          class="category-item"
          @click="changeCategory(category.id)"
        >
          {{ category.name }}
        </li>
      </ul>
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
          v-for="(song, index) in songList"
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
import { reactive, ref } from "vue";
import CommonWrapper from "@/components/common/CommonWrapper";
import SongItem from "./SongItem.vue";
import { getNewSong } from "@/api/song";
import CommonLoading from "@/components/common/CommonLoading";
const categories = [
  {
    id: "0",
    name: "全部",
  },
  {
    id: "7",
    name: "华语",
  },
  {
    id: "96",
    name: "欧美",
  },
  {
    id: "16",
    name: "韩国",
  },
  {
    id: "8",
    name: "日本",
  },
];

let currentCategoryId = ref("0");

let loading = ref(true);
let songList = reactive([]);
const getNewSongData = async () => {
  songList.length = 0;
  loading.value = true;
  const { data } = await getNewSong({ type: currentCategoryId.value });
  songList.push(...data);
  loading.value = false;
};
getNewSongData();

const changeCategory = id => {
  if(id === currentCategoryId.value) return 
  currentCategoryId.value = id;
  getNewSongData();
};
</script>

<style lang="less" scoped>
.new-song-tab-wrapper {
  .category-list {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .category-item {
      margin-right: 30px;
      height: 20px;
      line-height: 20px;
      color: #666;
      cursor: pointer;
      &:hover{
        color: #000;
      }
      &.active {
        color: #000;
        font-weight: 500;
      }
    }
  }
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
