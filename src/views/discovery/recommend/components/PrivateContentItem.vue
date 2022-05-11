<!--
 * @Author: BlackStar
 * @Date: 2022-03-17 14:17:02
 * @LastEditTime: 2022-05-11 14:15:45
 * @FilePath: /cloud-music-v3/src/views/discovery/recommend/components/PrivateContentItem.vue
 * @Description: 
-->
<template>
  <li
    class="private-content-item-box li-item-box"
    :style="style"
  >
    <div class="cover-box">
      <img
        v-lazy="privateContent.sPicUrl"
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
    default: 3,
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
  --margin-top: 56%;
}
</style>
