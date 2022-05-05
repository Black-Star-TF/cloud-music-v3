const areaList = [
  {
    id: "ALL",
    name: "全部",
  },
  {
    id: "ZH",
    name: "华语",
  },
  {
    id: "EA",
    name: "欧美",
  },
  {
    id: "KR",
    name: "韩国",
  },
  {
    id: "JP",
    name: "日本",
  },
];

const typeList = [
  {
    id: "hot",
    name: "推荐",
  },
  {
    id: "new",
    name: "全部",
  },
];
import { computed, reactive, ref, toRefs } from "vue";
import { albumApi } from "@/api";
import { useColumn, useFetchMore } from "@/hooks";

export default function useData(){
  const column = useColumn(1150, 5, 4);
  const state = reactive({
    loading: true,
    weekData: [],
    monthData: [],
    currentArea: "ALL",
    currentType: "hot"
  });
  
  const hasMore = ref(true);
  const limit = 20;
  const currentPage = ref(1);
  const count = computed(() => limit * currentPage.value);
  const loadWeekData = ref(true);

  // 由于后端没有分页，先获取到全部数，再由前端进行分页
  const total = reactive({
    weekData: [],
    monthData: [],
  });

  const getData = async () => {
    const { weekData, monthData } = await albumApi.newest({
      area: state.currentArea,
      type: state.currentType,
    });
    total.weekData = weekData || [];
    total.monthData = monthData || [];
    if (total.weekData.length > 0) {
      state.weekData = total.weekData.slice(0, count.value);
    } else {
      loadWeekData.value = false;
      state.monthData= total.monthData.slice(0, count.value);
    }
    state.loading = false;
  };

  const init = () => {
    state.loading = true;
    hasMore.value = true;
    state.weekData = [];
    state.monthData = [];
    total.weekData = [];
    total.monthData = [];
    currentPage.value = 1;
    loadWeekData.value = true;
  };

  const handleAreaChange = area => {
    init();
    getData();
  };

  const handleTypeChange = () => {
    init();
    getData();
  };

  const getDate = timestamp => {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return {
      year,
      month: month >  9 ? month : '0' + month
    };
  };

  // 滚动到底部，加载更多数据
  const getMore = () => {
    currentPage.value++;
    if(loadWeekData.value){
      state.weekData = total.weekData.slice(0, count.value);
      if (total.weekData.length === state.weekData.length) {
        loadWeekData.value = false;
        currentPage.value = 0;
      }
    }else{
      state.monthData = total.monthData.slice(0, count.value);
      if (total.monthData.length === state.monthData.length) {
        hasMore.value = false;
      }
    };
  };

  const wrapper = ref(document.getElementById('newestWrapper'));
  useFetchMore(wrapper, getMore, ref(false), hasMore);

  getData();

  return {
    ...toRefs(state),
    areaList,
    typeList,
    column,
    handleAreaChange,
    handleTypeChange,
    getMore,
    getDate,
  };
};