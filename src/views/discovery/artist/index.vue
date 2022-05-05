<template>
  <div
    ref="wrapper"
    class="artist-wrapper"
  >
    <div class="page-box">
      <!-- 分类 -->
      <category-selector
        v-model:current-category="currentCategory"
        :data="category"
        @category-change="handleCategoryChange"
      />
      <ul class="artist-container">
        <artist-item
          v-for="(artist, index) in list"
          :key="artist.id"
          :artist="artist"
          :index="index + 1"
          :column="column"
        />
      </ul>
      <common-loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import CategorySelector from "@/components/common/CategorySelector";
import ArtistItem from "./components/ArtistItem.vue";
import useData from './index';
const { 
  list,
  loading,
  currentCategory,
  column,
  wrapper,
  category,
  handleCategoryChange 
} = useData();
</script>

<style lang="less" scoped>
.artist-wrapper {
  height: 100%;
  padding: 15px 0;
  overflow: overlay;
  box-sizing: border-box;
  .artist-container {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
