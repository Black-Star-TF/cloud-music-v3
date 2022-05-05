/*
 * @Author: BlackStar
 * @Date: 2022-04-12 16:25:21
 * @LastEditTime: 2022-04-12 16:32:11
 * @FilePath: /cloud-music-v3/src/views/playlist-detail/index.js
 * @Description: 
 */
const tabList = [
  {
    id: 'song',
    label: '歌曲列表'
  },
  {
    id: 'comment',
    label: '评论'
  },
  {
    id: 'subscriber',
    label: '收藏者'
  },
];

import { reactive, toRefs, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { playlistApi } from '@/api';
const SongTab = defineAsyncComponent(() => import('./songs/index.vue'));
const CommentTab = defineAsyncComponent(() => import('./comments/index.vue'));
const SubscriberTab = defineAsyncComponent(() => import('./subscribers/index.vue'));

export default function useData() {
  const state = reactive({
    data: null,
    loading: true,
    currentTab: tabList[0]
  });

  const route = useRoute();
  const id = route.query.id;

  const getDetail = async () => {
    const { playlist } = await playlistApi.detail({ id: id });
    state.data = playlist;
    state.loading = false;
  };

  const getTab = () => {
    switch(state.currentTab.id){
      case 'song':
        return SongTab;
      case 'comment':
        return CommentTab;
      case 'subscriber': 
        return SubscriberTab;
    }
  };

  getDetail();

  return {
    ...toRefs(state),
    tabList,
    getTab,
  };
};