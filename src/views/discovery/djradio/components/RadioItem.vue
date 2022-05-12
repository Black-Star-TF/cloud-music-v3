<template>
  <li
    class="radio-item-box li-item-box"
    :style="style"
  >
    <div
      class="cover-box"
      @click="toRadioDetail(radio.id)"
    >
      <div
        v-if="radio.radioFeeType !== 0"
        class="tag"
      >
        付费精品
      </div>
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(radio.picUrl, 1000, 1000)
        "
        class="cover"
      >
      <div class="dj ellipsis1">
        {{ radio.name }}
      </div>
    </div>
    <div class="name-box ellipsis2">
      <span class="name">{{ radio.rcmdText ?? radio.rcmdtext }}</span>
    </div>
  </li>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
import { toRadioDetail } from '@/util/methods';
const props = defineProps({
  radio: {
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
.radio-item-box {
  .cover-box{
    .tag{
      width: 60px;
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      border-bottom-right-radius: 5px;
      background-color: #c3473a;
      color: #ffffff;
      z-index: 5;
    }
    .dj{
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      z-index: 2;
      padding-left: 5px;
    }
  }
}
</style>
