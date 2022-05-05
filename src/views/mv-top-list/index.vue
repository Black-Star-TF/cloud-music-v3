<template>
  <div class="mv-top-list-wrapper">
    <div class="page-box">
      <common-wrapper>
        <template #left>
          <span class="section-title">最近更新：今天</span>
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentArea"
            :type-list="areaList"
            :options="{ name: 'name', id: 'name' }"
            @type-change="handleAreaChange"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-top-list-item
              v-for="(mv, index) in list"
              :key="mv.id || index"
              :mv="mv"
              :index="index + 1"
            />
          </ul>
          <common-loading v-if="loading" />
        </template>
      </common-wrapper>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { mvApi } from "@/api";
import TypeSelector from "@/components/common/TypeSelector";
import MvTopListItem from "./components/MvTopListItem.vue";
const route = useRoute();
const areaList = [
  { name: "内地" },
  { name: "港台" },
  { name: "欧美" },
  { name: "日本" },
  { name: "韩国" },
];

const state = reactive({
  loading: true,
  currentArea: route.params.area || "内地",
  list: [],
});

const getData = async () => {
  const { data } = await mvApi.topList({
    limit: 50,
    area: state.currentArea,
  });
  state.list.push(...data);
  state.loading = false;
};
const handleAreaChange = () => {
  state.loading = true;
  state.list = [];
  getData();
};

getData();

const { 
  loading,
  currentArea,
  list,
} = toRefs(state);
</script>

<style lang="less" scoped>
.mv-top-list-wrapper {
  height: 100%;
  overflow: overlay;
  box-sizing: border-box;
  padding: 15px 0;
  .section-title {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #999;
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
