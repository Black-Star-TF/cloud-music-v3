<template>
  <li class="song-item-box">
    <span class="index">{{ index > 9 ? index : `0${index}` }}</span>
    <div class="cover-box">
      <img v-lazy="$formatImgSize(song.album.blurPicUrl, 200, 200)">
    </div>
    <span class="info-box">
      <span class="name-box">
        <span class="name">{{ song.name }}</span>
        <span
          v-if="song.alias.length > 0"
          class="alia"
        >（{{ song.alias[0] }}）</span>
      </span>
      <span
        class="iconfont icon-more more"
      />
    </span>
    
    <span class="artists">
      <span
        v-for="(artist, idx) in song.artists"
        :key="artist.id"
      >
        <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
        <i
          v-if="idx < song.artists.length - 1"
          class="sp"
        > | </i>
      </span>
    </span>
    <span class="album-box">
      <span>
        {{ song.album.name }}
      </span>
    </span>
    <span class="duration">{{ $formatDuration(song.duration) }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const toArtistDetail = id => console.log(id);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.song-item-box {
  display: flex;
  padding: 0 30px;
  height: 80px;
  margin: 0 -30px;
  align-items: center;
  border-radius: 5px;
  &:nth-child(2n + 1) {
    background-color: #fafafa;
  }
  .cover-box {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    margin: 0 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .index {
    width: 20px;
    color: #bbb;
    font-size: 12px;
  }
  .info-box {
    flex: 9;
    min-width: 0;
    display: flex;
    align-items: center;
    .name-box{
      font-size: 14px;
      color: #333;
      .ellipsis;
      .alia{
        color: #999;
      }
    }
    .more{
      margin-left: 5px;
      color: #999;
      visibility: hidden;
      cursor: pointer;
      visibility: hidden;
      &:hover{
        color: #666;
      }
    }
  }
  &:hover .info-box .more{
    visibility: visible;
  }
  .artists {
    flex: 4;
    .ellipsis;
    color: #666;
    margin-left: 5px;
    font-size: 12.5px;
    span {
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
    .sp {
      color: #333;
    }
  }
  .album-box {
    flex: 3;
    .ellipsis;
    margin-left: 5px;
    font-size: 12.5px;
    color: #666;
    span {
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
  .duration {
    width: 100px;
    font-size: 12px;
    text-align: right;
    color: #999;
  }
}
</style>
