<template>
  <li
    class="radio-item-box"
    @click="toRadioDetail(radio.id)"
  >
    <div class="cover-box">
      <img
        :src="$formatImgSize(radio.picUrl, 100, 100)"
        class="cover"
      >
    </div>
    <div class="name-box ellipsis1">
      <span
        class="name"
        v-html="markKeywords(radio.name, keywords)"
      />
    </div>
    <div class="creator-box ellipsis1">
      by
      <span
        class="creator"
        v-html="markKeywords(radio.dj.nickname, keywords)"
      />
    </div>
  </li>
</template>

<script setup>
import { markKeywords, toRadioDetail } from "@/util/methods";
const props = defineProps({
  radio: {
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
.radio-item-box {
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
  .cover-box {
    width: 60px;
    height: 60px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    margin-right: 15px;
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .name-box {
    flex: 5;
    font-size: 14px;
    line-height: 15px;
    .name {
      color: #333;
      &:hover {
        color: #000;
      }
    }
  }
  .creator-box {
    flex: 4;
    font-size: 12px;
    color: #bbb;
    .creator {
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
