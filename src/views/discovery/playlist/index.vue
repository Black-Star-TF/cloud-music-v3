<!--
 * @Author: BlackStar
 * @Date: 2022-03-15 12:37:54
 * @LastEditTime: 2022-03-19 21:46:35
 * @FilePath: /cloud-music-v3/src/views/discovery/playlist/index.vue
 * @Description: 
-->
<template>
  <div class="playlist-wrapper">
    <common-wrapper>
      <template #left>
        <button
          type="text"
          class="switch-button"
          @click="openCategoryPanel"
        >
          {{ currentCategory.name }}
        </button>
        <!-- 歌单分类面板 -->
        <playlist-category-panel
          v-model:visible="panelVisible"
          :categories="categoryData"
          :current-category="currentCategory"
          @category-change="changeCategory"
        />
      </template>
      <template #right>
        <ul class="hot-category">
          <template
            v-for="(item, index) in hotCategories"
            :key="item.name"
          >
            <li
              :class="{ active: getCatActive(item) }"
              @click="changeCategory(item)"
            >
              {{ item.name }}
            </li>
            <span
              v-if="index < hotCategories.length - 1"
              class="sp"
            />
          </template>
        </ul>
      </template>
      <template #content>
        <ul class="flex-box">
          <playlist-item
            v-for="(playlist, index) in data"
            :key="playlist.id"
            :playlist="playlist"
            :column="5"
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
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  getPlaylistCategory,
  getHotPlaylistCategory,
  getPlaylists,
} from "@/api/playlist";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import PlaylistItem from "@/components/list-item/PlaylistItem.vue";
import PlaylistCategoryPanel from "@/components/unique/PlaylistCategoryPanel.vue";

// =====歌单列表
// 存放歌单列表数据
let data = reactive([]);
// 分页数据
let loading = ref(true);
let pageSize = ref(30);
let pageIndex = ref(1);
let offset = computed(() => (pageIndex.value - 1) * pageSize.value);
let totalCount = ref(0);
async function getPlaylistsData() {
  data.length = 0;
  loading.value = true;
  const { playlists, total } = await getPlaylists(
    currentCategory.value.name,
    pageSize.value,
    offset.value
  );
  loading.value = false;
  totalCount.value = total;
  data.push(...playlists);
}
function handlePageChange() {
  getPlaylistsData();
}

// =====歌单分类
// 当前歌单分类
let currentCategory = ref({});
// 全部分类
let categoryData = {
  all: {},
  sub: [],
  types: {},
};
// 热门分类
let hotCategories = reactive([]);

async function getCategory() {
  const { all, sub, categories } = await getPlaylistCategory();
  categoryData.all = all;
  categoryData.sub = sub;
  categoryData.types = categories;
  currentCategory.value = all;
  getPlaylistsData();
}
async function getHotCategory() {
  const { tags } = await getHotPlaylistCategory();
  hotCategories.length = 0;
  hotCategories.push(...tags);
}

// =====切换歌单类型
let panelVisible = ref(false);
function openCategoryPanel() {
  panelVisible.value = true;
}
function getCatActive(cat) {
  return cat.name === currentCategory.value.name;
}
function changeCategory(category) {
  currentCategory.value = category;
  pageIndex.value = 1;
  getPlaylistsData();
}
getCategory();
getHotCategory();
</script>

<style lang="less" scoped>
.playlist-wrapper {
  height: 100%;
  overflow: overlay;
  padding: 10px 30px;
  box-sizing: border-box;
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
  .hot-category {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12.5px;
    li {
      height: 22px;
      line-height: 22px;
      border-radius: 11px;
      padding: 0 10px;
      color: #666666;
      &:hover {
        color: #333333;
      }
      &.active {
        background-color: #fcf6f5;
        color: #ac3c29;
      }
    }
    .sp {
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #f2f2f2;
      margin: 5px;
    }
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
