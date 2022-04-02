<template>
  <ul class="playlist-tab">
    <playlist-item
      v-for="playlist in data"
      :key="playlist.id"
      :playlist="playlist"
      :keywords="keywords"
    />
  </ul>
</template>

<script setup>
import PlaylistItem from './PlaylistItem.vue'
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
