<template>
  <div
    ref="wrapper"
    class="total-mv-wrapper"
  >
    <div class="page-box">
      <category-selector
        v-model:current-category="currentCategory"
        :data="categoryData"
        tag-width="70"
        :options="{
          key: 'key',
          label: 'label',
          children: 'children',
          itemId: 'name',
          itemName: 'name',
        }"
        @category-change="handleCategoryChange"
      />
      <ul class="flex-box mv-wrapper">
        <mv-item
          v-for="(mv, index) in list"
          :key="mv.id"
          :mv="mv"
          :column="column"
          :index="index + 1"
        />
      </ul>
      <common-loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import CategorySelector from "@/components/common/CategorySelector";
import MvItem from "./components/MvItem.vue";
import useData from "./index";
const { 
  categoryData,
  loading,
  list,
  currentCategory,
  column,
  wrapper,
  handleCategoryChange
} = useData();
</script>

<style lang="less" scoped>
.total-mv-wrapper {
  height: 100%;
  overflow: overlay;
  box-sizing: border-box;
  padding: 15px 0;
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
}
</style>
