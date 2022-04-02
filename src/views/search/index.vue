<template>
  <div class="search-result-wrapper">
    <div class="wrapper-header">
      <div class="result-title">
        <span class="title-keywords">{{ keywords }}</span>
        <span
          v-if="totalCount > 0"
          class="result"
        >{{ result }}</span>
      </div>
      <tab-selector
        v-model:current-tab="currentSearchType"
        :tabs="searchTypeList"
        :loading="loading"
        @tab-change="handleTabChange"
      />
    </div>
    
    <div class="search-result-content">
      <component
        :is="getTab()"
        :data="data"
        :keywords="keywords"
      />
      <common-pagination
        v-if="!loading&&totalCount > pageSize"
        v-model:current-page="pageIndex"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
      <common-loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, defineAsyncComponent, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import TabSelector from "@/components/common/TabSelector";
import CommonLoading from '@/components/common/CommonLoading';
import { getSearchData } from "@/api/search";

const route = useRoute();

const SongTab = defineAsyncComponent(() => import("./components/SongTab.vue"));
const UserTab = defineAsyncComponent(() => import("./components/UserTab.vue"));
const AlbumTab = defineAsyncComponent(() =>
  import("./components/AlbumTab.vue")
);
const ArtistTab = defineAsyncComponent(() =>
  import("./components/ArtistTab.vue")
);
const LyricTab = defineAsyncComponent(() =>
  import("./components/LyricTab.vue")
);
const PlaylistTab = defineAsyncComponent(() =>
  import("./components/PlaylistTab.vue")
);
const RadioTab = defineAsyncComponent(() =>
  import("./components/RadioTab.vue")
);
const VideoTab = defineAsyncComponent(() =>
  import("./components/VideoTab.vue")
);

const keywords = ref(route.query.keywords);

const store = useStore();
if(store.state.app.keywords !== keywords.value){
  store.commit('app/setKeywords', keywords.value);
}

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
let currentSearchType = ref(searchTypeList[0]);

const getTab = () => {
  switch (currentSearchType.value.id) {
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

let loading = ref(true);
let data = ref([]);
let pageSize = ref(currentSearchType.value.limit);
let pageIndex = ref(1);
let offset = computed(() => (pageIndex.value - 1) * pageSize.value);
let totalCount = ref(0);
const search = async () => {
  loading.value = true;
  data.value = [];
  const { result } = await getSearchData({
    keywords: keywords.value,
    limit: pageSize.value,
    offset: offset.value,
    type: currentSearchType.value.id,
  });
  totalCount.value = result[`${currentSearchType.value.name}Count`];
  data.value =
    result[
      `${
        currentSearchType.value.name == "djRadios"
          ? "djRadio"
          : currentSearchType.value.name
      }s`
    ];
  loading.value = false;
};

const handlePageChange = () => {
  search();
};
search();

const result = computed(() => {
  return `找到${totalCount.value}${currentSearchType.value.quantifier}`;
});

const handleTabChange = () => {
  pageSize.value = currentSearchType.value.limit;
  pageIndex.value = 1;
  totalCount.value = 0;
  search();
};

onBeforeRouteUpdate((to) => {
  keywords.value = to.query.keywords;
  handleTabChange();
});
</script>

<style lang="less" scoped>
.search-result-wrapper {
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  overflow: hidden;
  .wrapper-header{
    padding: 0 30px;
  }
  .result-title {
    height: 25px;
    vertical-align: bottom;
    margin-bottom: 10px;
    .title-keywords {
      font-weight: 500;
      font-size: 25px;
      color: #333;
      margin-right: 5px;
    }
    .result {
      font-size: 13px;
      letter-spacing: 1px;
      color: #666;
    }
  }
  .search-result-content{
    height: calc(100% - 66px);
    overflow: overlay;
    box-sizing: border-box;
    .common-pagination{
      margin: 20px 0 ;
    }
    .common-loading{
      margin-top: 50px;
    }
  }
}
</style>
