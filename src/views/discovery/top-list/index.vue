<template>
  <div class="top-list-wrapper">
    <div
      v-if="!loading"
      class="page-box"
    >
      <common-wrapper>
        <template #left>
          <span class="section-title">官方榜</span>
        </template>
        <template #content>
          <ul>
            <official-top-list-item
              v-for="topList in topListData.ofTopLists"
              :key="topList.id"
              :top-list="topList"
            />
          </ul>
        </template>
      </common-wrapper>

      <common-wrapper>
        <template #left>
          <span class="section-title">全球榜</span>
        </template>
        <template #content>
          <ul class="flex-box">
            <global-top-list-item
              v-for="(topList,index) in topListData.glTopLists"
              :key="topList.id"
              :top-list="topList"
              :index="index+1"
              :column="column"
            />
          </ul>
        </template>
      </common-wrapper>
    </div>
    <common-loading v-else />
  </div>
</template>

<script setup>
import { playlistApi } from "@/api";
import { reactive, ref, nextTick } from "vue";
import axios from "axios";
import CommonWrapper from "@/components/common/CommonWrapper";
import OfficialTopListItem from "./components/OfficialTopListItem";
import GlobalTopListItem from "./components/GlobalTopListItem";
import CommonLoading from '@/components/common/CommonLoading';

import {useColumn} from '@/hooks/index.js';
let column = useColumn(1060, 5, 4);

const loading = ref(true);
const topListData = reactive({
  ofTopLists: [],
  glTopLists: []
});
const getTopListData = async () => {
  const { list } = await playlistApi.topList();
  topListData.ofTopLists = list.slice(0, 4);
  topListData.glTopLists= list.slice(4);
  loading.value = false;
};
getTopListData();
</script>

<style lang="less" scoped>
.top-list-wrapper {
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
  padding: 10px 0;
  .flex-box{
    display: flex;
    flex-wrap: wrap;
  }
  .section-title{
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
}
</style>
