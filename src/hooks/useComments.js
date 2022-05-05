/*
 * @Author: BlackStar
 * @Date: 2022-04-12 16:20:58
 * @LastEditTime: 2022-04-12 16:21:59
 * @FilePath: /cloud-music-v3/src/hooks/useComments.js
 * @Description: 
 */

import { ref, nextTick, computed, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default function useComments(api) {
  const route = useRoute();
  const id = route.query.id;

  const state = reactive({
    loading: false,
    hotComments: [],
    comments: [],
    moreHot: false,
    total: 0,
    currentPage: 1,
    pageSize: 20,
  });
  
  const offset = computed(() => (state.currentPage - 1) * state.pageSize);

  const getComments = async () => {
    const { hotComments, comments, moreHot, total } = await api.comments({
      id,
      limit: state.pageSize,
      offset: offset.value,
    });
    state.hotComments = hotComments;
    state.comments = comments;
    state.moreHot = moreHot;
    state.total = total;
    state.loading = false;
  };

  const showHotComments = computed(() => {
    return (
      state.hotComments &&
      state.hotComments.length > 0 &&
      state.currentPage === 1
    );
  });

  const showNewComments = computed(() => {
    return state.comments && state.comments.length > 0;
  });

  const anchor = ref(null);  // 锚点
  const handlePageChange = async () => {
    state.loading = true;
    getComments();
    nextTick(() => {
      anchor.value.scrollIntoView();
    });
  };

  getComments();

  return {
    ...toRefs(state),
    anchor,
    showHotComments,
    showNewComments,
    handlePageChange,
  };
}