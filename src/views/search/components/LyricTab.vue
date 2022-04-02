<template>
  <div class="lyric-tab">
    <song-list-table
      :song-list="data"
      :keywords="keywords"
      :show-lyric="true"
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

</style>
