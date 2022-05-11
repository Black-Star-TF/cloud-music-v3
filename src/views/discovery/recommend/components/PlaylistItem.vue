<template>
  <li
    class="playlist-item-box li-item-box"
    :style="style"
  >
    <div
      class="cover-box"
      @click="toPlaylistDetail(playlist.id)"
    >
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(playlist.picUrl ?? playlist.coverImgUrl, 1000, 1000)
        "
        class="cover"
      >
      <span class="play-count">
        <span class="iconfont icon-pause icon" />{{ $formatCount(playlist.playCount) }}
      </span>
    </div>
    <div class="name-box ellipsis2">
      <span
        class="name"
        @click="toPlaylistDetail(playlist.id)"
      >{{ playlist.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index';
import { toPlaylistDetail } from '@/util/methods';
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

