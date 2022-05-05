<template>
  <div class="search-result-wrapper">
    <div class="wrapper-header">
      <div class="result-title">
        <span class="title-keywords">{{ keywords }}</span>
        <span
          v-if="totalCount > 0"
          class="result"
        >{{ resultText }}</span>
      </div>
      <tab-selector
        v-model:current-tab="currentSearchType"
        :tabs="searchTypeList"
        :loading="loading"
        @tab-change="handleTabChange"
      />
    </div>
    
    <div class="search-result-content">
      <component
        :is="getTab()"
        :data="list"
        :keywords="keywords"
      />
      <common-pagination
        v-if="!loading&&totalCount > pageSize"
        v-model:current-page="currentPage"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
      <common-loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import TabSelector from "@/components/common/TabSelector";
import useData from './index';
const {
  list,
  loading,
  keywords,
  pageSize,
  resultText,
  totalCount,
  currentPage,
  searchTypeList,
  currentSearchType,
  getTab,
  handleTabChange,
  handlePageChange,
} = useData();
</script>

<style lang="less" scoped>
.search-result-wrapper {
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  overflow: hidden;
  .wrapper-header{
    padding: 0 30px;
  }
  .result-title {
    height: 25px;
    vertical-align: bottom;
    margin-bottom: 10px;
    .title-keywords {
      font-weight: 500;
      font-size: 25px;
      color: #333;
      margin-right: 5px;
    }
    .result {
      font-size: 13px;
      letter-spacing: 1px;
      color: #666;
    }
  }
  .search-result-content{
    height: calc(100% - 66px);
    overflow: overlay;
    box-sizing: border-box;
    .common-pagination{
      margin: 20px 0 ;
    }
    .common-loading{
      margin-top: 50px;
    }
  }
}
</style>
