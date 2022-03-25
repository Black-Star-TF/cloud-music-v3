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
          > 最新MV </span>
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentNewestArea"
            :type-list="areaList"
            :options="{ name: 'name', id: 'name' }"
            @type-change="changeNewestArea"
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
          > 热播MV </span>
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
          >
            网易出品
          </span>
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
          > MV排行榜 </span>
        </template>
        <template #right>
          <type-selector
            v-model:current-type="currentTopListArea"
            :type-list="areaList"
            :options="{ name: 'name', id: 'name' }"
            @type-change="changeTopListArea"
          />
        </template>
        <template #content>
          <ul class="flex-box">
            <mv-top-list-item
              v-for="(mv, index) in topMVList"
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getNewestMV,
  getTotalMV,
  getExclusiveMV,
  getMVTopList,
} from "@/api/mv";
import CommonWrapper from "@/components/common/CommonWrapper";
import CommonLoading from "@/components/common/CommonLoading";
import TypeSelector from "@/components/common/TypeSelector";
import MvItem from "@/views/total-mv/components/MvItem.vue";
import ExclusiveMvItem from "./components/ExclusiveMvItem.vue";
import MvTopListItem from "@/views/mv-top-list/components/MvTopListItem.vue";
import { useColumn } from "@/hooks/index.js";
let column = useColumn(1300, 4, 3);

const areaList = [
  { name: "内地" },
  { name: "港台" },
  { name: "欧美" },
  { name: "日本" },
  { name: "韩国" },
];
let currentNewestArea = ref({ name: "内地" });
let newestMVList = reactive([]);
const getNewestMVData = async () => {
  const { data } = await getNewestMV({
    limit: 8,
    area: currentNewestArea.value.name,
  });
  newestMVList.length = 0;
  newestMVList.push(...data);
};

let hotMVList = reactive([]);
const getHotMVData = async () => {
  const { data } = await getTotalMV({ limit: 8, order: "最热" });
  hotMVList.push(...data);
};
let exclusiveMVList = reactive([]);
const getExclusiveMVData = async () => {
  const { data } = await getExclusiveMV({ limit: 8 });
  exclusiveMVList.push(...data);
};

let topMVList = reactive([]);
let currentTopListArea = ref({ name: "内地" });
const getMVTopListData = async () => {
  const { data } = await getMVTopList({
    limit: 10,
    area: currentTopListArea.value.name,
  });
  topMVList.length = 0;
  topMVList.push(...data);
};

const changeNewestArea = () => {
  // 获取数据
  newestMVList.length = 0;
  newestMVList.length = 6;
  getNewestMVData();
};
const changeTopListArea = () => {
  // 获取数据
  topMVList.length = 0;
  topMVList.length = 10;
  getMVTopListData();
};

const router = useRouter();
const toTotalMV = mvType => {
  let area = "全部",
    type = "全部",
    order = "最新";
  if (mvType == "new") {
    area = currentNewestArea.value.name;
  } else if (mvType == "hot") {
    order = "最热";
  } else if (mvType == "exclusive") {
    type = "网易出品";
  }
  router.push({
    name: "totalMV",
    params: {
      area,
      type,
      order,
    },
  });
};

const toMVTopList = () => {
  router.push({
    name: "MVTopList",
    params: {
      area: currentTopListArea.value.name,
    },
  });
}

let loading = ref(true);
Promise.all([
  getNewestMVData(),
  getHotMVData(),
  getExclusiveMVData(),
  getMVTopListData(),
]).then(() => {
  loading.value = false;
});
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
  }
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
