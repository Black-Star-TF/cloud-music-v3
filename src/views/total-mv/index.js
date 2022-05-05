const categoryData = [
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
    children: [
      { name: "上升最快" },
      { name: "最热" },
      { name: "最新" },
    ],
  },
];

import { ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { mvApi } from "@/api";
import { useFetchMore, useColumn } from "@/hooks";

export default function useData() {
  const column = useColumn(1300, 4, 3);
  const route = useRoute();
  const state = reactive({
    loading: true,
    list: [],
    currentCategory: {
      area: route.params.area || "全部",
      type: route.params.type || "全部",
      order: route.params.order || "最新",
    }
  });

  const limit = 24;
  const offset = ref(0);
  const hasMore = ref(true);

  const getData = async () => {
    state.loading = true;
    const { data, hasMore: more } = await mvApi.list({
      limit,
      offset: offset.value,
      ...state.currentCategory,
    });
    state.list.push(...data);
    hasMore.value = more;
    state.loading = false;
  };

  const handleCategoryChange = () => {
    state.list = [];
    offset.value = 0;
    hasMore.value = true;
    getData();
  };

  const wrapper = ref();
  useFetchMore(
    wrapper,
    getData,
    state.loading,
    hasMore,
    () => (offset.value += limit)
  );

  getData();

  return {
    ...toRefs(state),
    column,
    wrapper,
    categoryData,
    handleCategoryChange
  };
}