/*
 * @Author: BlackStar
 * @Date: 2022-03-31 12:46:14
 * @LastEditTime: 2022-03-31 18:31:48
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/index.js
 * @Description: 
 */
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import {
  getRecommendBanner,
  getRecommendPlaylist,
  getRecommendSongs,
  getRecommendPrivateContents,
  getRecommendMVs,
} from "@/api/recommend";


export const useData = () => {
  let state = reactive({
    banners: [],
    playlists: [],
    privateContents: [],
    songs: [],
    mvs: []
  });

  const getBanners = async () => {
    const { banners } = await getRecommendBanner("0");
    state.banners = banners;
  };

  const getPlaylists = async () => {
    const { result } = await getRecommendPlaylist(10);
    state.playlists = result;
  };

  const getPrivateContents = async () => {
    const { result } = await getRecommendPrivateContents();
    state.privateContents = result;
  };

  const getSongs = async () => {
    const { result } = await getRecommendSongs(10);
    state.songs = result.map(item => item.song);
  };

  const getMVs = async () => {
    const { result } = await getRecommendMVs();
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

  let loading = ref(true);
  Promise.all([getBanners(), getPlaylists(), getPrivateContents(), getSongs(), getMVs()]).then(() => {
    loading.value = false;
  });

  return {
    state,
    loading,
    toPlaylist,
    toNewestMusic,
    toPrivateContent,
    toMV
  };
};