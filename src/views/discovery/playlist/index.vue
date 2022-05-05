<template>
  <div class="playlist-wrapper">
    <div class="page-box">
      <high-quality-playlist-banner
        v-if="hqPlaylist"
        :high-quality-playlist="hqPlaylist"
        @click="toHqPage"
      />
      <common-wrapper>
        <template #left>
          <button
            v-if="currentCategory"
            class="switch-button"
            type="text"
            @click="openPanel"
          >
            {{ currentCategory }}
          </button>
          <!-- 歌单分类面板 -->
          <playlist-category-panel
            v-model:visible="panelVisible"
            v-model:current-category="currentCategory"
            :data="categoryData"
            @category-change="handleCategoryChange"
          />
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentCategory"
            :type-list="hotCategory"
            :options="{ name: 'name', id: 'name' }"
            @type-change="handleCategoryChange"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <playlist-item
              v-for="(playlist, index) in list"
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
        v-model:current-page="currentPage"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="getList"
      />
      <common-loading v-else />
    </div>
  </div>
</template>

<script setup>
import PlaylistItem from "./components/PlaylistItem.vue";
import PlaylistCategoryPanel from "./components/PlaylistCategoryPanel.vue";
import highQualityPlaylistBanner from "./components/HighQualityPlaylistBanner.vue";
import TypeSelector from "@/components/common/TypeSelector";
import useData from './index';
const {
  loading,
  pageSize,
  currentPage,
  totalCount,
  list,
  currentCategory,
  categoryData,
  hotCategory,
  hqPlaylist,
  column,
  panelVisible,
  handleCategoryChange,
  toHqPage,
  getList,
  openPanel,
} = useData();
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
