const areaList = [
  { name: "内地" },
  { name: "港台" },
  { name: "欧美" },
  { name: "日本" },
  { name: "韩国" },
];

import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { mvApi } from "@/api";
import { useColumn } from "@/hooks/index.js";

export default function useData(){
  const column = useColumn(1300, 4, 3);
  const router = useRouter();
  const state = reactive({
    loading: true,
    newestMVList: [],
    hotMVList: [],
    exclusiveMVList: [],
    topList: [],
    currentNewestArea: "内地",
    currentTopListArea: "内地",
  });

  const getNewestMV = async () => {
    const { data } = await mvApi.newest({
      limit: 8,
      area: state.currentNewestArea
    });
    state.newestMVList = data;
  };

  const getHotMV = async () => {
    const { data } = await mvApi.list({ limit: 8, order: "最热" });
    state.hotMVList = data;
  };

  const getExclusiveMV = async () => {
    const { data } = await mvApi.exclusive({ limit: 8 });
    state.exclusiveMVList = data;
  };

  const getTopList = async () => {
    const { data } = await mvApi.topList({
      limit: 10,
      area: state.currentTopListArea
    });
    state.topList = data;
  };

  const handleNewestAreaChange = () => {
    state.newestMVList = new Array(8);
    getNewestMV();
  };

  const handleTopListAreaChange = () => {
    state.topList = new Array(10);
    getTopList();
  };

  const toTotalMV = mvType => {
    let area = "全部", type = "全部", order = "最新";
    if (mvType == "new") {
      area = state.currentNewestArea;
    } else if (mvType == "hot") {
      order = "最热";
    } else if (mvType == "exclusive") {
      type = "网易出品";
    }
    router.push({
      name: "totalMV",
      params: { area, type, order },
    });
  };

  const toMVTopList = () => {
    router.push({
      name: "MVTopList",
      params: {
        area: state.currentTopListArea,
      },
    });
  };

  Promise.all([
    getNewestMV(),
    getHotMV(),
    getExclusiveMV(),
    getTopList(),
  ]).then(() => {
    state.loading = false;
  });

  return {
    ...toRefs(state),
    areaList,
    column,
    handleNewestAreaChange,
    handleTopListAreaChange,
    toTotalMV,
    toMVTopList,
  };
}