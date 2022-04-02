<template>
  <div class="suggested-playlists">
    <span class="title">歌单</span>
    <span
      v-for="playlist in data"
      :key="playlist.id"
      class="playlist"
      @click="handleClick(playlist.id)"
      v-html="markKeywords(playlist.name, keywords)"
    />
  </div>
</template>

<script setup>
import { markKeywords } from "@/util/methods";
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const handleClick = id => {
  emits("click", id);
};
</script>

<style lang="less" scoped>
.suggested-playlists {
  font-size: 13px;
  .title {
    display: inline-block;
    color: #999;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .playlist {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #333;
    padding-left: 20px;
    box-sizing: border-box;
    display: inline-block;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
