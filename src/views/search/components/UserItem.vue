<template>
  <li class="user-item-box">
    <div class="cover-box">
      <img
        :src="$formatImgSize(user.avatarUrl, 100, 100)"
        class="cover"
      >
      <img
        v-if="user.avatarDetail"
        :src="user.avatarDetail.identityIconUrl"
        class="identity-icon"
      >
    </div>
    <div class="name-box ellipsis1">
      <span
        class="name"
        v-html="markKeywords(user.nickname, keywords)"
      />
      <span
        class="icon-gender"
        :class="getGenderClass()"
      >
        <img
          v-if="user.gender === 1"
          src="~@/assets/image/icon-man.png"
        >
        <img
          v-if="user.gender === 2"
          src="~@/assets/image/icon-woman.png"
        >
      </span>
    </div>
    <div class="desc-box ellipsis1">
      {{ user.signature || user.description }}
    </div>
  </li>
</template>

<script setup>
import { markKeywords } from "@/util/methods";
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  keywords: {
    type: String,
    default: "",
  },
});
const getGenderClass = () => {
  if (props.user.gender === 1) {
    return "man";
  } else if (props.user.gender === 2) {
    return "woman";
  }
  return "";
};
</script>

<style lang="less" scoped>
.user-item-box {
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
    border-radius: 50%;
    margin-right: 15px;
    position: relative;
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .identity-icon {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      right: -3px;
      bottom: 0;
    }
  }
  .name-box {
    flex: 1;
    font-size: 14px;
    height: 16px;
    line-height: 16px;
    .name {
      color: #333;
      &:hover {
        color: #000;
      }
    }
    .icon-gender {
      vertical-align: bottom;
      margin-left: 10px;
      display: inline-block;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      border-radius: 50%;
      overflow: hidden;
      &.man {
        background-color: #d2f2fe;
      }
      &.woman {
        background-color: #f9d0e7;
      }
      img {
        width: 10px;
        height: 10px;
      }
    }
  }
  .desc-box {
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: #bbb;
  }
}
</style>
