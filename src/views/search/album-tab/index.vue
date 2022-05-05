<template>
  <ul class="album-tab">
    <album-item
      v-for="album in data"
      :key="album.id"
      :album="album"
      :keywords="keywords"
    />
  </ul>
</template>

<script setup>
import AlbumItem from '../components/AlbumItem.vue';
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  keywords: {
    type: String,
    default: ''
  }
});
</script>

<style lang="less" scoped>

</style>
