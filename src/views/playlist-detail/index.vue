<template>
  <div class="playlist-detail-wrapper">
    <template v-if="!loading">
      <header-detail
        :playlist="data"
      />
      <div class="tab-nav-wrapper">
        <tab-selector
          v-model:currentTab="currentTab"
          :tabs="tabList"
        />
        <!-- <div class="search-box"></div> -->
      </div>
      <component
        :is="getTab()"
        :id="id"
      />
    </template>
    <common-loading v-else />
  </div>
</template>

<script setup>
import HeaderDetail from './components/HeaderDetail.vue';
import TabSelector from '@/components/common/TabSelector';
import useData from "./index";
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  }
});
const {
  loading,
  data,
  currentTab,
  tabList,
  id,
  getTab,
} = useData(props.id);
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
