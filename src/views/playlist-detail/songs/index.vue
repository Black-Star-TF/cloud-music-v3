<template>
  <div class="song-tab">
    <song-list-table
      v-if="!loading"
      :data="tableData"
      :table-columns="tableColumns"
    />
    <common-loading v-else />
  </div>
</template>

<script setup>
import SongListTable from '../components/SongListTable.vue';
import useData from './index';
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  }
});
const { loading, tableData, tableColumns } = useData(props.id);
</script>

<style lang="less" scoped>
.song-tab{
  margin-bottom: 30px;
  .common-loading {
    margin-top: 30px;
  }
}
</style>
