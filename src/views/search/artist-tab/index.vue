<template>
  <ul class="artist-tab">
    <artist-item
      v-for="artist in data"
      :key="artist.id"
      :artist="artist"
      :keywords="keywords"
    />
  </ul>
</template>

<script setup>
import ArtistItem from '../components/ArtistItem.vue';
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
.artist-tab{

}
</style>
