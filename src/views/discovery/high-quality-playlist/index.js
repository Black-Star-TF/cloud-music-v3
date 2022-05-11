import { ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useColumn, useFetchMore } from "@/hooks/index.js";
import { playlistApi } from '@/api';
export default function useData(){
  const column = useColumn(1250, 3, 2);
  const route = useRoute();
  const state = reactive({
    loading: true,
    currentCategory: route.params.category || "全部歌单",
    list: [],
    categoryData: {
      all: { name: "全部歌单" },
      sub: [],
    },
    panelVisible: false,
  });

  const getCategory = async () => {
    const { tags } = await playlistApi.hqCategory();
    state.categoryData.sub = tags;
  };

  let before = ref(null);
  let hasMore = ref(true);

  const getList = async () => {
    const { playlists, lasttime, more } = await playlistApi.hqList({
      cat: state.currentCategory,
      limit: 24,
      before: before.value,
    });
    before.value = lasttime;
    hasMore.value = more;
    state.list.push(...playlists);
    state.loading = false;
  };

  const handleCategoryChange = () => {
    before.value = null;
    hasMore.value = true;
    state.list = [];
    getList();
  };

  const openCategoryPanel = () => {
    state.panelVisible = true;
  };

  const wrapper = ref();
  useFetchMore(wrapper, getList, state.loading, hasMore);

  getCategory();
  getList();

  return {
    ...toRefs(state),
    column,
    wrapper,
    handleCategoryChange,
    openCategoryPanel,
  };
}