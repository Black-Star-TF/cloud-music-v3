<template>
  <div class="playlist-detail-wrapper">
    <template v-if="!loading">
      <header-detail
        v-if="playlist"
        :playlist="playlist"
      />
      <div class="tab-nav-wrapper">
        <tab-selector
          v-model:currentTab="currentTab"
          :tabs="tabList"
        />
        <!-- <div class="search-box"></div> -->
      </div>
      <component :is="getTab()" />
    </template>
    <common-loading v-else />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getPlaylistDetail } from '@/api/playlist';
import CommonLoading from '@/components/common/CommonLoading';
import HeaderDetail from './components/HeaderDetail.vue';
import TabSelector from '@/components/common/TabSelector';
const SongTab = defineAsyncComponent(() => import('./song-tab/index.vue'));
const CommentTab = defineAsyncComponent(() => import('./comment-tab/index.vue'));
const SubscriberTab = defineAsyncComponent(() => import('./subscriber-tab/index.vue'));
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

let currentTab = ref(tabList[0]);

const getTab = () => {
  switch(currentTab.value.id){
    case 'song':
      return SongTab;
    case 'comment':
      return CommentTab;
    case 'subscriber': 
      return SubscriberTab;
  }
};

let loading = ref(true);
const route = useRoute();
let id = ref(route.query.id);
let playlist = ref(null);

const getPlaylistDetailData = async () => {
  loading.value = true;
  const result = await getPlaylistDetail({ id: id.value });
  playlist.value = result.playlist;
  loading.value = false;
};
getPlaylistDetailData();
</script>

<style lang="less" scoped>
.playlist-detail-wrapper{
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
  .tab-nav-wrapper{
    margin: 30px 30px 0;
    position: relative;
  }
  .common-loading {
    margin-top: 50px;
  }
}
</style>
