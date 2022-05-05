<template>
  <div class="search-hot-content">
    <div class="title">
      热搜榜
    </div>
    <div
      v-for="(item, index) in hotContent"
      :key="item.key"
      class="hot-content-item"
      @click="handleClick(item.searchWord)"
    >
      <div
        class="index"
        :class="{ hot: index < 3 }"
      >
        {{ index + 1 }}
      </div>
      <div class="info">
        <div class="desc">
          <span
            class="search-word"
            :class="{ hot: index < 3 }"
          >{{
            item.searchWord
          }}</span>
          <span class="score">{{ item.score }}</span>
          <img
            v-if="item.iconType === 1"
            :src="item.iconUrl"
            class="hot-icon"
          >
        </div>
        <div
          v-if="item.content"
          class="content"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { searchApi } from "@/api";
import { reactive } from "vue";

let hotContent = reactive([]);
const getHotContentData = async () => {
  const { data } = await searchApi.hotContent();
  hotContent.length = 0;
  hotContent.push(...data);
};
getHotContentData();

const emits = defineEmits(['search']);
const handleClick = keywords => {
  emits('search', keywords);
};
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.search-hot-content {
  width: 100%;
  .title {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    color: #666;
    margin: 10px 0 10px 20px;
  }
  .hot-content-item {
    height: 55px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
    .index {
      width: 25px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
      font-size: 16px;
      font-weight: 500;
      color: #bbb;
      &.hot {
        color: #eb4d45;
      }
    }
    .info {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      padding-right: 30px;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      .desc {
        height: 20px;
        line-height: 20px;
        width: 100%;
        .search-word {
          color: #333;
          .ellipsis;
          margin-right: 10px;
          font-size: 13px;
          &.hot {
            font-weight: 500;
          }
        }
        .score {
          font-size: 12px;
          color: #bbb;
        }
        .hot-icon {
          margin-left: 10px;
          height: 12px;
        }
      }
      .content {
        .ellipsis;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        width: 100%;
        color: #999;
      }
    }
  }
}
</style>
