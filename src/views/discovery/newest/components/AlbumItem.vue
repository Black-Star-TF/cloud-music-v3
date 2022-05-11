<template>
  <li
    class="album-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="$formatImgSize(album.picUrl, 500, 500)"
        class="cover"
      >
      <div class="mask" />
    </div>
    <div class="name-box ellipsis2">
      <span class="name">
        {{ album.name }}
        <span
          v-if="album.alias.length > 0"
          class="alia"
        >（{{ album.alias[0] }}）</span>
      </span>
    </div>
    <div class="artists-box ellipsis">
      <span class="artist">{{ album.artist?.name }}</span>
    </div>
  </li>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 5,
  },
  index: {
    type: Number,
    required: true,
  },
  marginRight: {
    type: Number,
    default: 40,
  },
});

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
.album-item-box {
  .cover-box {
    .mask{
      position: absolute;
      width: 13%;
      height: 100%;
      left: 100%;
      background: url("~@/assets/image/album-cover.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
