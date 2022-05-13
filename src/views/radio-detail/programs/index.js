import { reactive, toRefs, computed, watch } from 'vue';
import radioApi from '@/api/radio';
export default function useData(rid) {
  const state = reactive({
    currentPage: 1,
    pageSize: 100,
    totalCount: 0,
    asc: false,
    list: [],
    loading: false
  });

  const offset = computed(() => {
    return (state.currentPage - 1) * state.pageSize;
  });

  const getData = async () => {
    state.loading = true;
    const { count, programs } = await radioApi.program({
      rid,
      limit: state.pageSize,
      offset: offset.value,
      asc: state.asc
    });
    state.totalCount = count,
    state.list = programs;
    state.loading = false;
  };

  const changeOrder = asc => {
    state.asc = asc;
  };

  watch(() => state.asc, () => {
    state.currentPage = 1;
    getData();
  });
  getData();

  return {
    ...toRefs(state),
    getData,
    changeOrder
  };
}