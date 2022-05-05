const searchTypeList = [
  {
    id: "1",
    label: "单曲",
    name: "song",
    quantifier: "首单曲",
    limit: 100,
  },
  {
    id: "100",
    label: "歌手",
    name: "artist",
    quantifier: "位歌手",
    limit: 20,
  },
  {
    id: "10",
    label: "专辑",
    name: "album",
    quantifier: "张专辑",
    limit: 20,
  },
  {
    id: "1014",
    label: "视频",
    name: "video",
    quantifier: "个视频",
    limit: 20,
  },
  {
    id: "1000",
    label: "歌单",
    name: "playlist",
    quantifier: "个歌单",
    limit: 20,
  },
  {
    id: "1006",
    label: "歌词",
    name: "song",
    quantifier: "首歌词",
    limit: 20,
  },
  {
    id: "1009",
    label: "主播电台",
    name: "djRadios",
    quantifier: "个电台",
    limit: 20,
  },
  {
    id: "1002",
    label: "用户",
    name: "userprofile",
    quantifier: "位用户",
    limit: 20,
  },
];



import { computed, reactive, toRefs, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { searchApi } from "@/api";
const SongTab = defineAsyncComponent(() => import("./song-tab/index"));
const UserTab = defineAsyncComponent(() => import("./user-tab/index"));
const AlbumTab = defineAsyncComponent(() => import("./album-tab/index"));
const ArtistTab = defineAsyncComponent(() => import("./artist-tab/index"));
const LyricTab = defineAsyncComponent(() => import("./lyric-tab/index"));
const PlaylistTab = defineAsyncComponent(() => import("./playlist-tab/index"));
const RadioTab = defineAsyncComponent(() => import("./radio-tab/index"));
const VideoTab = defineAsyncComponent(() => import("./video-tab/index"));

export default function useData() {
  const route = useRoute();
  const state  = reactive({
    keywords: route.query.keywords,
    currentSearchType: searchTypeList[0],
    list: [],
    loading: true,
    currentPage: 1,
    totalCount: 0,
  });

  const store = useStore();
  if(store.state.app.keywords !== state.keywords){
    store.commit('app/setKeywords', state.keywords);
  }

  const pageSize = computed(() => state.currentSearchType.limit);
  const offset = computed(() => (state.currentPage - 1) * pageSize.value);

  const getData = async () => {
    const { result } = await searchApi.list({
      keywords: state.keywords,
      limit: pageSize.value,
      offset: offset.value,
      type: state.currentSearchType.id,
    });
    state.totalCount = result[`${state.currentSearchType.name}Count`];
    state.list = result[
      `${
        state.currentSearchType.name == "djRadios"
          ? "djRadio"
          : state.currentSearchType.name
      }s`
    ];
    state.loading = false;
  };

  const resultText = computed(() => {
    return `找到${state.totalCount}${state.currentSearchType.quantifier}`;
  });

  const handlePageChange = () => {
    getData();
  };

  const handleTabChange = () => {
    state.list = [];
    state.currentPage = 1;
    state.totalCount = 0;
    getData();
  };

  onBeforeRouteUpdate((to) => {
    state.keywords = to.query.keywords;
    handleTabChange();
  });

  const getTab = () => {
    switch (state.currentSearchType.id) {
      case "1":
        return SongTab;
      case "100":
        return ArtistTab;
      case "10":
        return AlbumTab;
      case "1014":
        return VideoTab;
      case "1000":
        return PlaylistTab;
      case "1006":
        return LyricTab;
      case "1009":
        return RadioTab;
      case "1002":
        return UserTab;
    }
  };

  getData();

  return {
    ...toRefs(state),
    pageSize,
    searchTypeList,
    resultText,
    handlePageChange,
    handleTabChange,
    getTab,
  };
}