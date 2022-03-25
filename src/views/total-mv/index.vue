<template>
  <div
    ref="wrapper"
    class="total-mv-wrapper"
  >
    <div class="page-box">
      <category-selector
        v-model:current-category="currentCategory"
        :data="categoryData"
        :tag-width="70"
        :options="{
          key: 'key',
          label: 'label',
          children: 'children',
          itemId: 'name',
          itemName: 'name',
        }"
        @category-change="changeCategory"
      />
      <ul class="flex-box mv-wrapper">
        <mv-item
          v-for="(mv, index) in mvList"
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
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getTotalMV } from "@/api/mv";
import { useFetchMore, useColumn } from "@/hooks";
import CommonLoading from "@/components/common/CommonLoading";
import CategorySelector from "@/components/common/CategorySelector";
import MvItem from "./components/MvItem.vue";
const categoryData = reactive([
  {
    key: "area",
    label: "地区：",
    children: [
      { name: "全部" },
      { name: "内地" },
      { name: "港台" },
      { name: "欧美" },
      { name: "韩国" },
      { name: "日本" },
    ],
  },
  {
    key: "type",
    label: "类型：",
    children: [
      { name: "全部" },
      { name: "官方版" },
      { name: "原声" },
      { name: "现场版" },
      { name: "网易出品" },
    ],
  },
  {
    key: "order",
    label: "排序：",
    children: [{ name: "上升最快" }, { name: "最热" }, { name: "最新" }],
  },
]);
const route = useRoute();
let currentCategory = ref({
  area: route.params.area || "全部",
  type: route.params.type || "全部",
  order: route.params.order || "最新",
});

let column = useColumn(1300, 4, 3);

let loading = ref(true);
let hasMore = ref(true);
let mvList = reactive([]);
let limit = 24;
let offset = ref(0);
const getMVList = async () => {
  loading.value = true;
  const { data, hasMore: more } = await getTotalMV({
    limit,
    offset: offset.value,
    ...currentCategory.value,
  });
  mvList.push(...data);
  hasMore.value = more;
  loading.value = false;
};
const wrapper = useFetchMore(
  getMVList,
  loading,
  hasMore,
  () => (offset.value += limit)
);
const changeCategory = () => {
  mvList.length = 0;
  offset.value = 0;
  hasMore.value = true;
  getMVList();
};
getMVList();
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
