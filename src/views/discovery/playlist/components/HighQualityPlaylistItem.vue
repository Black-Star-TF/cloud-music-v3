<template>
  <li
    class="high-quality-playlist-item-box"
    :style="style"
  >
    <div class="cover-box">
      <div class="mask" />
      <img :src="$formatImgSize(playlist.coverImgUrl, 500, 500)">
      <span class="play-count">{{ $formatCount(playlist.playCount) }}</span>
    </div>
    <div class="info-box">
      <div class="name">
        {{ playlist.name }}
      </div>
      <div class="creator">
        by {{ playlist.creator.nickname }} 
        <img
          class="icon"
          :src="playlist?.creator?.avatarDetail?.identityIconUrl"
        >
      </div>
      <div class="more">
        <span class="tag">{{ playlist.tag }}</span>
        <span class="copywriter">{{ playlist.copywriter }}</span>
      </div>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index'
const props = defineProps({
  playlist: {
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
    default: 20,
  },
})

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.high-quality-playlist-item-box{
  height: 130px;
  display: flex;
  margin-bottom: 20px;
  .cover-box{
    width: 130px;
    height: 130px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    img{
      width: 100%;
      height: 100%;
    }
    .play-count{
      position: absolute;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      top: 0;
      right: 10px;
      color: #fff;
      z-index: 3;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0) 80%,
        rgba(0, 0, 0, 0.2)
      );
    }
  }
  .info-box{
    flex: 1;
    .name{
      margin-top: 20px;
      display: inline-block;
      .ellipsis(1);
      cursor: pointer;
      font-size: 14px;
      color: #333;
      &:hover{
        color: #000;
      }
    }
    .creator{
      .ellipsis(1);
      margin-top: 15px;
      display: inline-block;
      font-size: 12px;
      cursor: pointer;
      color: #999;
      &:hover{
        color: #666;
      }
      .icon{
        margin-left: 2px;
        width: 13px;
        height: 13px
      }
    }
    .more{
      .ellipsis(1);
      margin-top: 15px;
      font-size: 12px;
      color: #bbb;
      .tag{
        display: inline-block;
        height: 15px;
        line-height: 15px;
        padding: 0 5px;
        color: #c54c40;
        border-radius: 3px;
        border: 1px solid #c54c40;
        margin-right: 5px;
      }
    }
  }
}
</style>
