<template>
  <div
    class="subscriber-item-box"
    :style="style"
  >
    <img
      class="cover"
      :src="subscriber.avatarUrl"
    />
    <div class="info-box">
      <div class="nickname-box">
        <span class="nickname">{{subscriber.nickname}}</span>
        <span
          class="icon-gender"
          :class="getGenderClass()"
        >
          <img
            v-if="subscriber.gender === 1"
            src="~@/assets/image/icon-man.png"
          >
          <img
            v-if="subscriber.gender === 2"
            src="~@/assets/image/icon-woman.png"
          >
        </span>
      </div>
      <div
        v-if="subscriber.signature"
        class="signature"
      >{{ subscriber.signature }}</div>
    </div>
  </div>
</template>

<script setup>
import { useFlexStyle } from "@/hooks/index";
const props = defineProps({
  subscriber: {
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
const getGenderClass = () => {
  if (props.subscriber.gender === 1) {
    return "man";
  } else if (props.subscriber.gender === 2) {
    return "woman";
  }
  return "";
};

let style = useFlexStyle(props);
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.subscriber-item-box{
  width: 340px;
  height: 120px;
  display: flex;
  align-items: center;
  .cover {
    width: 90px;
    height: 90px;
    border: 1px solid #f2f2f2;
    border-radius: 50%;
  }
  .info-box {
    flex: 1;
    height: 90px;
    margin-left: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .nickname-box {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      .ellipsis;
      .nickname {
        // vertical-align: bottom;
        color: #333;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .icon-gender {
        vertical-align: bottom;
        margin-left: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
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
    .signature{
      font-size: 12px;
      height: 20px;
      margin-top: 10px;
      color: #bbb;
      line-height: 20px;
      .ellipsis;
    }
  }
}
</style>

