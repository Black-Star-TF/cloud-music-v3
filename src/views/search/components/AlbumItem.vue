<template>
  <li
    class="album-item-box"
    @click="toAlbumDetail(album.id)"
  >
    <div class="cover-box">
      <img
        :src="$formatImgSize(album.picUrl, 100, 100)"
        class="cover"
      >
      <div class="mask-box" />
    </div>
    <div class="name-box ellipsis1">
      <span class="name">
        <span v-html="markKeywords(album.name,keywords)" />
        <span
          v-if="album?.alias?.length > 0"
          class="alia"
          v-html="markKeywords(`(${album.alias[0]})`,keywords)" 
        />
      </span>
    </div>
    <div class="artist-box ellipsis1">
      <span
        class="artist"
        @click.stop
      >
        <span v-html="markKeywords(album.artist.name,keywords)" />
        <span
          v-if="album.artist?.alias?.length > 0"
          class="alia"
          v-html="markKeywords(`(${album.artist.alias[0]})`,keywords)" 
        />
      </span>
    </div>
  </li>
</template>

<script setup>
import { markKeywords, toAlbumDetail } from '@/util/methods';
const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
  keywords: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped>
.album-item-box{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
  cursor: pointer;
  &:nth-child(2n) {
    background-color: #fafafa;
  }
  &:hover {
    background-color: #f2f2f2;
  }
  .cover-box{
    width: 60px;
    height: 60px;
    border: 1px solid #f2f2f2;
    position: relative;
    border-radius: 5px;
    margin-right: 15px;
    .cover{
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .mask-box{
      position: absolute;
      width: 13%;
      height: 100%;
      left: 100%;
      top: 0;
      background: url("~@/assets/image/album-cover.png") no-repeat;
      background-size: cover;
    }
  }
  .name-box {
    flex: 1;
    font-size: 14px;
    line-height: 15px;
    .name{
      color: #333;
      &:hover {
        color: #000;
      }
      .alia{
        color: #999;
      }
    }
  }
  .artist-box {
    flex: 1;
    font-size: 12px;
    .artist{
      color: #666;
      &:hover{
        color: #333;
      }
      .alia{
      color: #999;
      margin-left: 5px;
    }
    }
    
  }
}
</style>
