const tableColumns = [
  {
    id: 'index',
    title: '',
    prop: '',
    className: 'index-column'
  },
  {
    id: 'name',
    title: '音乐标题',
    prop: 'name',
    className: 'name-column'
  },
  {
    id: 'artist',
    title: '歌手',
    prop: 'ar',
    className: 'artist-column'
  },
  {
    id: 'album',
    title: '专辑',
    prop: 'al',
    className: 'album-column'
  },
  {
    id: 'duration',
    title: '时长',
    prop: 'dt',
    className: 'duration-column'
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

import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { playlistApi } from '@/api';

export default function useData(id) {
  const route = useRoute();

  const state = reactive({
    tableData: [],
    loading: true,
  });

  const getSongList = async () => {
    state.loading = true;
    const {songs, privileges} = await playlistApi.songList({ limit: 500, id });
    songs.forEach((song, index) => {
      song.privilege = privileges[index];
    });
    state.tableData = songs.map(formatSong);
    state.loading = false;
  };

  getSongList();
  
  return {
    ...toRefs(state),
    tableColumns,
  };
};