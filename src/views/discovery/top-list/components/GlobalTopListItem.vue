<template>
  <li
    class="global-top-list-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(topList.coverImgUrl, 1000, 1000)
        "
        class="cover"
      >
      <span class="play-count">
        <span class="iconfont icon-pause icon" />{{ $formatCount(topList.playCount) }}
      </span>
    </div>
    <div class="name-box ellipsis1">
      <span class="name">{{ topList.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index';
const props = defineProps({
  topList: {
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
