<template>
  <li
    class="song-item-box"
    :style="style"
  >
    <div class="mask" />
    <img
      class="cover-box"
      :src="$formatImgSize(song.album.picUrl, 120, 120)"
    >
    <div class="index-box">
      {{ index > 9 ? index : `0${index}` }}
    </div>
    <div class="info-box">
      <div class="name">
        {{ song.name }}
      </div>
      <artist-list :artists="song.artists" />
    </div>
    <div class="mv-box">
      <!-- <span v-if="song.mvid">mv</span> -->
      <!-- TODO:mv图标 -->
    </div>
  </li>
</template>

<script setup>
import useFlexStyle from '@/hooks/useFlexStyle'
import ArtistList from "@/components/common/ArtistList.vue";
const props = defineProps({
  song: {
    type: Object ,
    required: true,
  },
  column: {
    type: Number,
    default: 2,
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
let style = useFlexStyle(props, 10);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.song-item-box {
  height: 80px;
  border-top: 0.5px solid #f7f7f7;
  border-bottom: 0.5px solid #f7f7f7;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  overflow: visible;
  &:hover {
    .mask {
      visibility: visible;
    }
  }
  .mask {
    visibility: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -10px;
    right: -10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    z-index: 0;
  }
  .cover-box {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1;
  }
  .index-box {
    width: 30px;
    text-align: center;
    z-index: 1;
    color: #c6c6c6;
    font-size: 12px;
  }
  .info-box {
    flex: 1;
    height: 60px;
    z-index: 1;
    overflow: hidden;
    .name {
      margin-top: 15px;
      margin-bottom: 5px;
      width: 100%;
      height: 15px;
      .ellipsis;
      line-height: 15px;
      font-size: 13.5px;
      color: #333333;
      box-sizing: border-box;
    }
  }
  .mv-box {
    width: 55px;
    height: 60px;
  }
}
</style>
