<template>
  <li
    class="playlist-item-box"
    :style="style"
  >
    <div
      class="cover-box"
      @click="toPlaylistDetail(playlist.id)"
    >
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(playlist.picUrl ?? playlist.coverImgUrl, 500, 500)
        "
      >
      <span class="play-count">
        <span class="iconfont icon-pause pause" />{{
          $formatCount(playlist.playCount)
        }}
      </span>
      <!-- TODO: 创建人 -->
      <div class="creator">
        <!-- <img src="~@/assets/image/icon-user.png"> -->
        {{ playlist.creator.nickname }}
      </div>
    </div>
    <div class="name-box">
      <span
        class="name"
        @click="toPlaylistDetail(playlist.id)"
      >{{
        playlist.name
      }}</span>
    </div>
  </li>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
import { toPlaylistDetail } from "@/util/methods";
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
});

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.playlist-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  .box-style(100%);
  .name-box {
    .ellipsis_rows(2);
  }
  .cover-box {
    .creator {
      position: absolute;
      left: 5px;
      bottom: 5px;
      font-size: 12px;
      height: 15px;
      line-height: 15px;
      width: calc(100% - 50px);
      .ellipsis;
      color: #fff;
      z-index: 3;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
