<template>
  <div class="song-tab">
    <song-list-table
      v-if="album.songs"
      :data="album.songs"
      :table-columns="tableColumns"
    />
  </div>
</template>

<script setup>
import SongListTable from '@/views/playlist-detail/components/SongListTable.vue';
const props = defineProps({
  album: {
    type: Object,
    required: true,
  }
});
const tableColumns = [
  {
    id: 'index',
    title: '',
    className: 'index-column'
  },
  {
    id: 'name',
    title: '音乐标题',
    className: 'name-column'
  },
  {
    id: 'artist',
    title: '歌手',
    className: 'artist-column'
  },
  {
    id: 'album',
    title: '专辑',
    className: 'album-column'
  },
  {
    id: 'duration',
    title: '时长',
    className: 'duration-column'
  },
];
</script>

<style lang="less" scoped>
.song-tab{
  margin-bottom: 30px;
}
</style>

