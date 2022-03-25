<template>
  <div
    ref="wrapper"
    class="high-quality-playlist-wrapper"
  >
    <common-wrapper>
      <template #left>
        <span class="section-title">精品歌单</span>
      </template>
      <template #right>
        <button
          class="switch-button"
          type="text"
          @click="openCategoryPanel"
        >
          {{
            currentCategory.name == "全部歌单" ? "筛选" : currentCategory.name
          }}
        </button>
        <high-quality-playlist-category-panel
          v-model:visible="panelVisible"
          v-model:current-category="currentCategory"
          :categories="categoryDate"
          @category-change="changeCategory"
        />
      </template>
      <template #content>
        <ul
          class="flex-box"
        >
          <high-quality-playlist-item
            v-for="(playlist, index) in playlistDate"
            :key="playlist.id"
            :playlist="playlist"
            :column="column"
            :index="index + 1"
          />
        </ul>
        <common-loading v-if="loading" />
      </template>
    </common-wrapper>
  </div>
</template>

<script setup>
import {
  getHighQualityPlaylistCategory,
  getHighQualityPlaylists,
} from "@/api/playlist";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import HighQualityPlaylistItem from "../components/HighQualityPlaylistItem.vue";
import HighQualityPlaylistCategoryPanel from "../components/HighQualityPlaylistCategoryPanel.vue";
import CommonLoading from '@/components/common/CommonLoading'
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

import { useColumn, useFetchMore } from "@/hooks/index.js";
let column = useColumn(1250, 3, 2);

const route = useRoute();

let currentCategory = ref({
  name: "",
});
currentCategory.value = {
  name: route.params.category || "全部歌单",
};

// 获取精品歌单标签列表
let categoryDate = reactive({
  all: { name: "全部歌单" },
  sub: [],
});

const getHighQualityCategory = async () => {
  const { tags } = await getHighQualityPlaylistCategory();
  categoryDate.sub = tags;
};
getHighQualityCategory();

// 获取精品歌单列表
let loading = ref(true)
let playlistDate = reactive([]);
let hasMore = ref(true);
let before = ref(null);
const getPlaylistsData = async () => {
  loading.value = true
  const { playlists, lasttime, more } = await getHighQualityPlaylists({
    cat: currentCategory.value.name,
    limit: 24,
    before: before.value,
  });
  before.value = lasttime;
  hasMore.value = more;
  playlistDate.push(...playlists);
  loading.value = false;
};
getPlaylistsData();

// 分类面板
let panelVisible = ref(false);
const openCategoryPanel = () => {
  panelVisible.value = true;
};

const changeCategory = () => {
  before.value = null;
  hasMore.value = true;
  playlistDate.length = 0;
  getPlaylistsData();
};

const wrapper = useFetchMore(
  getPlaylistsData,
  loading,
  hasMore
);
</script>

<style lang="less" scoped>
.high-quality-playlist-wrapper {
  height: 100%;
  overflow: overlay;
  padding: 10px 30px;
  box-sizing: border-box;
  .section-title {
    font-size: 15px;
  }
  .switch-button {
    width: 90px;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    box-sizing: border-box;
    text-align: center;
    font-size: 13px;
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
