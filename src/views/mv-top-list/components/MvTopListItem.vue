<template>
  <div
    class="mv-top-list-item-box"
  >
    <div class="index-box">
      {{ index }}
    </div>
    <div class="cover-box">
      <img
        v-if="mv.id"
        v-lazy="mv.cover"
      >
      <!-- <span class="mv-pop">{{ $formatCount(mv.playCount) }}</span> -->
    </div>
    <div class="info-box">
      <span class="name-box">
        <span class="name">{{ mv.name }}</span>
      </span>
      <span class="artists-box">
        <template
          v-for="(artist, idx) in mv.artists"
          :key="artist.id"
        >
          <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
          <i
            v-if="idx < mv.artists.length - 1"
            class="sp"
          > | </i>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
const props = defineProps({
  mv: {
    type: Object,
    default: () => ({
      artists: [],
    }),
  },
  index:{
    type: Number,
    required: true,
  }
});

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.mv-top-list-item-box {
  height: 120px;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  width: calc((100% - 20px) / 2);
  margin-right: 20px;
  &:nth-child(2n){
    margin-right: 0;
    padding-left: 10px;
    &::before{
      content: "";
      display: block;
      position: absolute;
      left: 0;
      height: 120px;
      width: 1px;
      background-color: #f2f2f2;
    }
  }
  &:nth-child(2){
    &::before{
      bottom: 0;
      height: 115px;
    }
  }
  &:last-child{
    &::before{
      top: 0;
      height: 115px;
    }
  }

  .index-box {
    width: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 450;
    color: #999;
  }
  .cover-box {
    width: 170px;
    height: 100px;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .info-box {
    flex: 1;
    max-width: 160px;
    height: 100px;
    .name-box {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      .ellipsis;
      .name {
        color: #333;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
    .artists-box {
      .ellipsis;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      color: #999;
      span {
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
      .sp {
        color: #333;
      }
    }
  }
}
</style>
