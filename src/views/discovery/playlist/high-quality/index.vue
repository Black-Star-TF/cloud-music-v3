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
            currentCategory == "全部歌单" ? "筛选" : currentCategory
          }}
        </button>
        <high-quality-playlist-category-panel
          v-model:visible="panelVisible"
          v-model:current-category="currentCategory"
          :categories="categoryData"
          @category-change="handleCategoryChange"
        />
      </template>
      <template #content>
        <ul
          class="flex-box"
        >
          <high-quality-playlist-item
            v-for="(playlist, index) in list"
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
import HighQualityPlaylistItem from "../components/HighQualityPlaylistItem.vue";
import HighQualityPlaylistCategoryPanel from "../components/HighQualityPlaylistCategoryPanel.vue";
import useData from "./index";
const {
  loading,
  list,
  column,
  wrapper,
  currentCategory,
  categoryData,
  panelVisible,
  handleCategoryChange,
  openCategoryPanel,
} = useData();
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
