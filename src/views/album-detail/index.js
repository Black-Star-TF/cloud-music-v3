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
    id: 'description',
    label: '专辑详情'
  },
];

const formatSong = song => {
  const { id, name, ar, alia, fee, al, dt, mv, privilege } = song;
  return {
    id,
    name,
    artists: ar.map(item => ({ id: item.id, name: item.name})),
    alias: [...alia],
    fee,
    album: {
      id: al.id,
      name: al.name,
    },
    duration: dt,
    mv,
    privilege
  };
};

import { toRefs, reactive, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { albumApi } from '@/api';

const SongTab = defineAsyncComponent(() => import('./songs/index.vue'));
const CommentTab = defineAsyncComponent(() => import('./comments/index.vue'));
const DescriptionTab = defineAsyncComponent(() => import('./description/index.vue'));

export default function useData(id) {
  const state = reactive({
    data: null,
    loading: true,
    currentTab: tabList[0],
  });

  const route = useRoute();

  const getDetail = async () => {
    const result = await Promise.all([albumApi.detail({ id }), albumApi.dynamicDetail({ id })]);
    const { songs, album } = result[0];
    const { shareCount, subCount, commentCount} = result[1];
    album.songs = songs.map(formatSong);
    album.shareCount = shareCount;
    album.subscribedCount = subCount;
    album.commentCount = commentCount;
    state.data = album;
    state.loading = false;
  };

  const getTab = () => {
    switch(state.currentTab.id){
      case 'song':
        return SongTab;
      case 'comment':
        return CommentTab;
      case 'description':
        return DescriptionTab;
    }
  };

  getDetail();

  return {
    ...toRefs(state),
    tabList,
    getTab,
  };
}