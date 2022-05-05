import { reactive, toRefs } from "vue";
import { useRouter } from 'vue-router';
import  { rcmdApi } from '@/api/index.js';

export default function useData() {
  let state = reactive({
    banners: [],
    playlists: [],
    privateContents: [],
    songs: [],
    mvs: [],
    loading: true,
  });

  const getBanners = async () => {
    const { banners } = await rcmdApi.banner({ type: "0" });
    state.banners = banners;
  };

  const getPlaylists = async () => {
    const { result } = await rcmdApi.playlist({ limit: 10 });
    state.playlists = result;
  };

  const getPrivateContents = async () => {
    const { result } = await rcmdApi.privateContent();
    state.privateContents = result;
  };

  const getSongs = async () => {
    const { result } = await rcmdApi.song({ limit: 10 });
    state.songs = result.map(item => item.song);
  };

  const getMVs = async () => {
    const { result } = await rcmdApi.mv();
    state.mvs = result;
  };

  const router = useRouter();

  const toPlaylist = () => {
    router.push('/discovery/playlist');
  };

  const toNewestMusic = () => {
    router.push('/discovery/newest');
  };

  const toPrivateContent = () => {
    router.push('/private-content');
  };

  const toMV = () => {
    router.push('/v/mv');
  };

  Promise.all([
    getBanners(),
    getPlaylists(),
    getPrivateContents(),
    getSongs(),
    getMVs(),
  ]).then(() => {
    state.loading = false;
  });

  return {
    ...toRefs(state),
    toPlaylist,
    toNewestMusic,
    toPrivateContent,
    toMV
  };
};