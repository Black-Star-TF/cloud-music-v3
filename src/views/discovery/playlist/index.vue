<!--
 * @Author: BlackStar
 * @Date: 2022-03-15 12:37:54
 * @LastEditTime: 2022-03-23 13:34:36
 * @FilePath: /cloud-music-v3/src/views/discovery/playlist/index.vue
 * @Description: 
-->
<template>
  <div class="playlist-wrapper">
    <div class="page-box">
      <high-quality-playlist-banner
        :high-quality-playlist="highQualityPlaylist"
        @click="toHighQuality"
      />
      <common-wrapper>
        <template #left>
          <button
            v-if="currentCategory.name"
            class="switch-button"
            type="text"
            @click="openCategoryPanel"
          >
            {{ currentCategory.name }}
          </button>
          <!-- 歌单分类面板 -->
          <playlist-category-panel
            v-model:visible="panelVisible"
            v-model:current-category="currentCategory"
            :categories="categoryData"
            @category-change="changeCategory"
          />
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentCategory"
            :type-list="hotCategories"
            :options="{ name: 'name', id: 'name' }"
            @type-change="changeCategory"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <playlist-item
              v-for="(playlist, index) in data"
              :key="playlist.id"
              :playlist="playlist"
              :column="column"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-pagination
        v-if="!loading"
        v-model:current-page="pageIndex"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
      <common-loading v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import {
  getPlaylistCategory,
  getHotPlaylistCategory,
  getHighQualityPlaylistCategory,
  getPlaylists,
  getHighQualityPlaylists,
} from "@/api/playlist";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import PlaylistItem from "./components/PlaylistItem.vue";
import PlaylistCategoryPanel from "./components/PlaylistCategoryPanel.vue";
import highQualityPlaylistBanner from "./components/HighQualityPlaylistBanner.vue";
import CommonLoading from "@/components/common/CommonLoading";
import TypeSelector from "@/components/common/TypeSelector";

import { useColumn } from "@/hooks/index.js";
let column = useColumn(1060, 5, 4);
// =====歌单列表
// 存放歌单列表数据
let data = reactive([]);
let highQualityPlaylist = ref({});
// 分页数据
let loading = ref(true);
let pageSize = ref(40);
let pageIndex = ref(1);
let offset = computed(() => (pageIndex.value - 1) * pageSize.value);
let totalCount = ref(0);
// 获取歌单列表
const getPlaylistsData = async () => {
  data.length = 0;
  loading.value = true;
  const { playlists, total } = await getPlaylists({
    cat: currentCategory.value.name,
    limit: pageSize.value,
    offset: offset.value,
  });
  loading.value = false;
  totalCount.value = total;
  data.push(...playlists);
};
// 获取精品歌单
const getHighQualityPlaylistsData = async () => {
  const { playlists } = await getHighQualityPlaylists({
    cat: currentCategory.value.name,
    limit: 1,
  });
  highQualityPlaylist.value = playlists[0];
};

const handlePageChange = () => {
  getPlaylistsData();
};

// =====歌单分类
// 当前歌单分类
let currentCategory = ref({});
// 全部分类
let categoryData = {
  all: {},
  sub: [],
  types: {},
};
const getCategory = async () => {
  await getHighQualityCategory();
  const { all, sub, categories } = await getPlaylistCategory();
  categoryData.all = all;
  categoryData.sub = sub;
  categoryData.types = categories;
  currentCategory.value = all;
  getPlaylistsData();
};

// 热门分类
let hotCategories = reactive([]);
const getHotCategory = async () => {
  const { tags } = await getHotPlaylistCategory();
  hotCategories.length = 0;
  hotCategories.push(...tags);
};

// 精品歌单分类
let highQualityCategories = reactive([]);
let currentIsHighQuality = computed(() => {
  return (
    currentCategory.value.name == "全部歌单" ||
    !!highQualityCategories.find(
      item =>
        item.id === currentCategory.value.id ||
        item.name === currentCategory.value.name
    )
  );
});
const getHighQualityCategory = async () => {
  const { tags } = await getHighQualityPlaylistCategory();
  highQualityCategories.length = 0;
  highQualityCategories.push(...tags);
};

watch(currentCategory, () => {
  if (currentIsHighQuality.value) {
    // 获取精品歌单
    getHighQualityPlaylistsData();
  } else {
    highQualityPlaylist.value = {};
  }
});
// =====切换歌单类型
let panelVisible = ref(false);
const openCategoryPanel = () => {
  panelVisible.value = true;
};
const getCatActive = cat => {
  return cat.name === currentCategory.value.name;
};
const changeCategory = () => {
  // console.log(category);
  // currentCategory.value = category
  // console.log(currentCategory.value);
  pageIndex.value = 1;
  getPlaylistsData();
};
getCategory();
getHotCategory();

const router = useRouter();
const toHighQuality = () => {
  router.push({
    name: "highQuality",
    params: {
      category: currentCategory.value.name,
    },
  });
};
</script>

<style lang="less" scoped>
.playlist-wrapper {
  height: 100%;
  overflow: overlay;
  box-sizing: border-box;
  padding-top: 15px;
  .switch-button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    box-sizing: border-box;
    text-align: center;
    font-size: 13.5px;
    border: 0.5px solid #d9d9d9;
    cursor: default;
    &:hover {
      background-color: #f2f2f2;
    }
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
