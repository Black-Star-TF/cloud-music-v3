<template>
  <ul class="video-tab">
    <video-item
      v-for="(video, index) in data"
      :key="video.id"
      :index="index+1"
      :video="video"
      :column="column"
      :keywords="keywords"
    />
  </ul>
</template>

<script setup>
import VideoItem from '../components/VideoItem.vue';
import { useColumn } from '@/hooks';

const column = useColumn(1300, 5, 4);
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
.video-tab{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
}
</style>
