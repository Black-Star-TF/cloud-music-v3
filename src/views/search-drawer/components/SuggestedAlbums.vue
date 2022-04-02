<template>
  <div class="suggested-albums">
    <span class="title">专辑</span>
    <span
      v-for="album in data"
      :key="album.id"
      class="album"
      @click="handleClick(album.id)"
      v-html="markKeywords(album.name, keywords)"
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
.suggested-albums {
  font-size: 13px;
  .title {
    display: inline-block;
    color: #999;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .album {
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
