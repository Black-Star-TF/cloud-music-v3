<template>
  <div class="subscriber-tab">
    <div class="list-wrapper">
      <subscriber-item
        v-for="(item, index) in list"
        :key="item.id"
        :index="index+1"
        :subscriber="item"
        :column="column"
      ></subscriber-item>
    </div>
    
    <common-pagination
      v-if="!loading&&totalCount > pageSize"
      v-model:current-page="currentPage"
      :total="totalCount"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
    <common-loading v-if="loading" />
  </div>
</template>

<script setup>
import SubscriberItem from '../components/SubscriberItem.vue';
import useData from './index';
const {
  loading,
  list,
  currentPage,
  pageSize,
  totalCount,
  column,
  handlePageChange,
} = useData();
</script>

<style lang="less" scoped>
.subscriber-tab{
  padding: 0 30px;
  .list-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .common-pagination {
    margin: 15px 0;
  }
}
</style>
