<template>
  <div class="program-wrapper">
    <div class="top">
      <div class="total-count">
        共{{ totalCount }}期
      </div>
      <div class="order">
        <div class="label">
          排序
        </div>
        <div
          class="order-item desc"
          :class="{'active': !asc}"
          @click="changeOrder(false)"
        >
          <i class="iconfont icon-sort-desc" />
        </div>
        <div
          class="order-item asc"
          :class="{'active': asc}"
          @click="changeOrder(true)"
        >
          <i class="iconfont icon-sort-asc" />
        </div>
      </div>
    </div>
    <ul class="program-list">
      <template v-if="!loading">
        <program-item
          v-for="program in list"
          :key="program.id"
          :program="program"
        />
        <common-pagination
          v-model:current-page="currentPage"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="getData"
        />
      </template>
      <common-loading v-else />
    </ul>
  </div>
</template>

<script setup>
import ProgramItem from '../components/ProgramItem.vue';
import useData from './index';
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  }
});

const {
  list,
  totalCount,
  currentPage,
  pageSize,
  asc,
  loading,
  getData,
  changeOrder
} = useData(props.id);
</script>

<style lang="less" scoped>
.program-wrapper {
  .top {
    height: 30px;
    margin: 0 30px;
    line-height: 30px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .total-count {
      height: 100%;
      font-size: 13px;
      color: #666;
    }
    .order {
      height: 100%;
      display: flex;
      align-items: center;
      color: #999;
      .label {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        margin-right: 8px;
        color: #bbb;
      }
      &-item {
        width: 25px;
        height: 20px;
        background: #f2f2f2;
        line-height: 20px;
        text-align: center;
        &.desc {
          border-radius: 2px 0 0 2px;
          margin-right: 1px;
        }
        &.asc {
          border-radius: 0 2px 2px 0;
        }
        &:hover{
          background: #e8e8e8;
          color: #666;
        }
        &.active {
          background: #bfbfbf;
          color: #fff;
        }
      }
    }
  }
  .program-list {
    padding-bottom: 20px;
  }
}
</style>
