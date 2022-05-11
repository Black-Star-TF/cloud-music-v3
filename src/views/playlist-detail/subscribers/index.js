import { ref, reactive, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import {  useColumn ,useFetchMore } from '@/hooks';
import { playlistApi } from '@/api';

export default function useData(id) {
  const route = useRoute();
  const column = useColumn(1360, 3, 2);

  const state = reactive({
    loading: false,
    list: [],
    currentPage: 1,
    totalCount: 0,
  });

  const pageSize = 24;
  const offset = computed(() => (state.currentPage - 1) * pageSize);

  const getSubscribers = async () => {
    state.loading = true;
    state.list = [];
    const { subscribers, total } = await playlistApi.subscribers({
      id,
      limit: pageSize,
      offset: offset.value,
    });
    state.list = subscribers;
    state.totalCount = total;
    state.loading = false;
  };

  const handlePageChange = () => {
    getSubscribers();
  };

  getSubscribers();

  return {
    ...toRefs(state),
    pageSize,
    column,
    handlePageChange,
  };
};