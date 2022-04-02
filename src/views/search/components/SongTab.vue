<template>
  <div class="song-tab">
    <song-list-table
      :song-list="data"
      :keywords="keywords"
    />
  </div>
</template>

<script setup>
import SongListTable from "@/components/common/SongListTable"
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  keywords: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.song-tab{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
</style>
