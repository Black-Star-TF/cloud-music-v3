<template>
  <li
    class="album-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img v-lazy="$formatImgSize(album.picUrl, 500, 500)">
      <div class="mask-box" />
    </div>
    <div class="name-box">
      <span class="name">
        {{ album.name }}
        <span
          v-if="album.alias.length > 0"
          class="alia"
        >（{{ album.alias[0] }}）</span>
      </span>
    </div>
    <div class="artist-box">
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
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.album-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .cover-box {
    .mask-box{
      position: absolute;
      width: 13%;
      height: 100%;
      left: 100%;
      background: url("~@/assets/image/album-cover.png") no-repeat;
      background-size: cover;
    }
  }
  .box-style(100%);
  .name-box {
    font-size: 14px;
    .ellipsis_rows(2);
    .alia{
      color: #999;
    }
  }
  .artist-box {
    font-size: 13px;
    .ellipsis;
    color: #999;
    span {
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>
