<template>
  <li
    class="private-content-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="$formatImgSize(privateContent.sPicUrl, 800, 200)"
        class="cover"
      >
    </div>
    <div class="name-box ellipsis2">
      <span class="name">{{ privateContent.name }}</span>
    </div>
  </li>
</template>

<script setup>
import {useFlexStyle} from '@/hooks/index';
const props = defineProps({
  privateContent: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 4,
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
.private-content-item-box {
  --margin-top: 40%;
}
</style>
