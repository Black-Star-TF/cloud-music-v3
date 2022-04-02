<template>
  <li class="artist-item-box">
    <img
      :src="$formatImgSize(artist.picUrl, 100, 100)"
      class="avatar"
    >
    <div class="name-box">
      <span class="name">
        <span v-html="markKeywords(artist.name, keywords)" />
        <span
          v-if="artist.alias.length > 0"
          class="alia"
          v-html="markKeywords(`(${artist.alias[0]})`, keywords)"
        />
      </span>
    </div>
    <span
      v-if="artist.accountId"
      class="user-icon"
    >
      <img src="~@/assets/image/user.png">
    </span>
  </li>
</template>

<script setup>
import { markKeywords } from "@/util/methods";
const props = defineProps({
  artist: {
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
.artist-item-box {
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
  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 5px;
  }
  .name-box {
    font-size: 14px;
    line-height: 15px;
    .name {
      color: #333;
      &:hover {
        color: #000;
      }
      .alia {
        color: #999;
        margin-left: 5px;
      }
    }
  }
  .user-icon {
    margin-left: auto;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #c94b3e;
    overflow: hidden;
    text-align: center;
    line-height: 16px;
    img {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
