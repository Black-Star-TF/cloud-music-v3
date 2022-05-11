<template>
  <div class="v-mv-wrapper">
    <div
      v-if="!loading"
      class="page-box"
    >
      <!-- 最新mv -->
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toTotalMV('new')"
          >最新MV<i class="iconfont icon-back" /></span>
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentNewestArea"
            :type-list="areaList"
            :options="{ name: 'name', id: 'name' }"
            @type-change="handleNewestAreaChange"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-item
              v-for="(mv, index) in newestMVList.slice(0, column * 2)"
              :key="mv?.id || index"
              :mv="mv"
              :column="column"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toTotalMV('hot')"
          >热播MV<i class="iconfont icon-back" /></span>
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-item
              v-for="(mv, index) in hotMVList.slice(0, column * 2)"
              :key="mv?.id || index"
              :mv="mv"
              :column="column"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toTotalMV('exclusive')"
          >网易出品<i class="iconfont icon-back" /></span>
        </template>
        <template #content>
          <ul class="flex-box">
            <exclusive-mv-item
              v-for="(mv, index) in exclusiveMVList.slice(0, column * 2)"
              :key="mv?.id || index"
              :mv="mv"
              :column="column"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span
            class="section-title"
            @click="toMVTopList"
          >MV排行榜<i class="iconfont icon-back" /></span>
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentTopListArea"
            :type-list="areaList"
            :options="{ name: 'name', id: 'name' }"
            @type-change="handleTopListAreaChange"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-top-list-item
              v-for="(mv, index) in topList"
              :key="mv?.id || index"
              :mv="mv"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
    </div>
    <common-loading v-else />
  </div>
</template>

<script setup>
import TypeSelector from "@/components/common/TypeSelector";
import MvItem from "@/views/total-mv/components/MvItem.vue";
import ExclusiveMvItem from "./components/ExclusiveMvItem.vue";
import MvTopListItem from "@/views/mv-top-list/components/MvTopListItem.vue";
import useData from "./index";
const {
  areaList,
  loading,
  newestMVList,
  hotMVList,
  exclusiveMVList,
  topList,
  currentNewestArea,
  currentTopListArea,
  column,
  handleNewestAreaChange,
  handleTopListAreaChange,
  toTotalMV,
  toMVTopList,
} = useData();
</script>

<style lang="less" scoped>
.v-mv-wrapper {
  height: 100%;
  padding: 15px 0;
  overflow: overlay;
  box-sizing: border-box;
  .section-title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    &:hover {
      color: #000;
    }
    .iconfont {
      font-size: 20px;
      display: inline-block;
      transform: rotate(180deg);
      vertical-align: -1.5px;
    }
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
