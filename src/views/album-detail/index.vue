<template>
  <div class="album-detail-wrapper">
    <common-loading v-if="loading" />
    <template v-else>
      <header-detail :album="data" />
      <div class="tab-nav-wrapper">
        <tab-selector
          v-model:currentTab="currentTab"
          :tabs="tabList"
        />
      </div>
      <component
        :is="getTab()"
        :id="id"
        :album="data"
      />
    </template>
  </div>
</template>

<script setup>
import HeaderDetail from './components/HeaderDetail.vue';
import TabSelector from '@/components/common/TabSelector';
import useData from './index';
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  }
});
const {
  loading,
  data,
  tabList,
  currentTab,
  getTab,
} = useData(props.id);
</script>

<style lang="less" scoped>
.album-detail-wrapper{
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
