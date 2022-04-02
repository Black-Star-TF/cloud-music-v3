<template>
  <div class="suggested-songs">
    <span class="title">单曲</span>
    <span
      v-for="song in data"
      :key="song.id"
      class="song"
      @click="handleClick(song.id)"
    >
      <span
        class="name"
        v-html="markKeywords(song.name, keywords)"
      />
      <span class="artists">
        -
        <template
          v-for="artist in song.artists"
          :key="artist.id"
        >
          <span
            class="artist-name"
            v-html="markKeywords(artist.name, keywords)"
          />
        </template>
      </span>
    </span>
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
const emits = defineEmits(['click'])

const handleClick = id => {
  emits('click', id)
}
</script>

<style lang="less" scoped>
.suggested-songs {
  font-size: 13px;
  .title {
    display: inline-block;
    color: #999;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .song {
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
    .artist-name {
      margin-right: 5px;
    }
  }
}
</style>
