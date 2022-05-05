import { ref, reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { playlistApi } from '@/api';
import { useColumn } from "@/hooks/index.js";

export default function useData() {
  const state = reactive({
    loading: true,
    pageSize: 40,
    currentPage: 1,
    totalCount: 0,
    currentCategory: "",
    list: [],
    categoryData: {
      all: {},
      sub: [],
    },
    hotCategory: [],
    hqCategory: [],
    hqPlaylist: null,
  });

  const offset = computed(() => (state.currentPage - 1) * state.pageSize);

  // 歌单列表
  const getList = async () => {
    state.loading = true;
    state.list = [];
    const { playlists, total } = await playlistApi.list({
      cat: state.currentCategory,
      limit: state.pageSize,
      offset: offset.value,
    });
    state.list = playlists;
    state.totalCount = total;
    state.loading = false;
  };

  // 全部歌单分类
  const getCategory = async () => {
    const { all, sub, categories } = await playlistApi.category();
    state.categoryData.all = all;
    state.categoryData.sub = Object.keys(categories).map(key => {
      let id = Number(key);
      let name = categories[key];
      let options = sub.filter(item => item.category === id);
      return { id, name, options };
    });
    state.currentCategory = all.name;
  };

  // 热门歌单分类
  const getHotCategory = async () => {
    const { tags } = await playlistApi.hotCategory();
    state.hotCategory = tags;
  };

  // 精品歌单分类
  const getHqCategory = async () => {
    const { tags } = await playlistApi.hqCategory();
    state.hqCategory = tags;
  };

  // 初始化，获取数据
  const initData = async () => {
    await Promise.all([getHqCategory(), getHotCategory()]);
    await getCategory();
    setHqData();
    await getList();
  };

  // 当前歌单分类是否为精品歌单分类
  const isHq = computed(() => {
    return state.currentCategory == "全部歌单" ||
    !!state.hqCategory.find(
      item =>
        item.name === state.currentCategory
    );
  });

  // 获取精品歌单
  const getHqPlaylist = async () => {
    const { playlists } = await playlistApi.hqList({
      cat: state.currentCategory,
      limit: 1,
    });
    state.hqPlaylist = playlists[0];
  };

  // 判断当前类型是否为精品歌单类型，若是，则获取精品歌单，若不是，则重置
  const setHqData = () => {
    if(isHq.value){
      getHqPlaylist();
    }else{
      state.hqPlaylist = null;
    }
  };

  // 切换歌单
  const handleCategoryChange = () => {
    setHqData();
    state.currentPage = 1;
    getList();
  };
  
  const panelVisible = ref(false);
  const openPanel = () => {
    panelVisible.value = true;
  };

  const router = useRouter();
  const toHqPage = () => {
    router.push({
      name: "highQuality",
      params: {
        category: state.currentCategory,
      },
    });
  };

  const column = useColumn(1060, 5, 4);

  initData();

  return {
    ...toRefs(state),
    column,
    panelVisible,
    handleCategoryChange,
    toHqPage,
    getList,
    openPanel,
  };

}