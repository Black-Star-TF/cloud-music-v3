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
            @type-change="changeArea"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-top-list-item
              v-for="(mv, index) in mvList"
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
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getMVTopList } from "@/api/mv";
import CommonWrapper from "@/components/common/CommonWrapper";
import CommonLoading from "@/components/common/CommonLoading";
import TypeSelector from "@/components/common/TypeSelector";
import MvTopListItem from "./components/MvTopListItem.vue";
const route = useRoute();
let currentArea = ref({ name: route.params.area || "内地" });
const areaList = [
  { name: "内地" },
  { name: "港台" },
  { name: "欧美" },
  { name: "日本" },
  { name: "韩国" },
];

let loading = ref(true);
const mvList = reactive([]);
const getMVTopListData = async () => {
  loading.value = true;
  mvList.length = 0;
  const { data } = await getMVTopList({
    limit: 50,
    area: currentArea.value.name,
  });
  mvList.push(...data);
  loading.value = false;
};
const changeArea = () => {
  getMVTopListData();
};
getMVTopListData();
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
