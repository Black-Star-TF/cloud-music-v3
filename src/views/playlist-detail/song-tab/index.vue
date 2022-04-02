<template>
  <div class="song-tab">
    <song-list-table
      v-if="!loading"
      :data="songList"
      :table-columns="tableColumns"
    />
    <common-loading v-else />
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { getPlaylistSongs } from '@/api/playlist';
import CommonLoading from '@/components/common/CommonLoading';
import SongListTable from '../components/SongListTable.vue';
import { useTable } from './index';

const { tableColumns, formatSong } = useTable();

const route = useRoute();
let id = route.query.id;

const state = reactive({
  loading: true,
  songList: [],
});

const getPlaylistSongsData = async () => {
  state.loading = true;
  const {songs, privileges} = await getPlaylistSongs({ limit: 500, id });
  songs.forEach((song, index) => {
    song.privilege = privileges[index];
  });
  state.songList = songs.map(formatSong);
  state.loading = false;
};

const { loading, songList } = toRefs(state);

getPlaylistSongsData();
</script>

<style lang="less" scoped>
.song-tab{
  margin-bottom: 30px;
  .common-loading {
    margin-top: 30px;
  }
}
</style>
