<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:27:42
 * @LastEditTime: 2022-03-19 23:20:08
 * @FilePath: /cloud-music-v3/src/components/list-item/MvItem.vue
 * @Description: 
-->
<template>
  <div
    class="mv-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img :src="mv.picUrl">
      <span class="play-count">{{ $formatCount(mv.playCount) }}</span>
    </div>
    <div class="name-box">
      <span class="name">{{ mv.name }}</span>
    </div>
    <artist-list :artists="mv.artists" />
  </div>
</template>

<script setup>
// import { getStyle } from "@/util/methods.js";
import useFlexStyle from '@/hooks/useFlexStyle'
import ArtistList from "@/components/common/ArtistList.vue";
const props = defineProps({
  mv: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 4,
  },
  index: {
    type: Number,
    required: true,
  },
  marginRight: {
    type: Number,
    default: 20,
  },
})

let style = useFlexStyle(props)
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.mv-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .box-style(60%);
  .name-box{
    .ellipsis;
  }
}
</style>
