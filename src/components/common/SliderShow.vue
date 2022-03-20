<!--
 * @Author: BlackStar
 * @Date: 2022-03-16 12:34:16
 * @LastEditTime: 2022-03-19 22:54:25
 * @FilePath: /cloud-music-v3/src/components/common/SliderShow.vue
 * @Description: 
-->
<template>
  <div
    class="slider-show-wrapper"
    @mouseenter="pause"
    @mouseleave="start"
  >
    <div class="img-wrapper">
      <div
        v-for="(item, index) in data"
        :key="item[options.cover]"
        class="img-item"
        :class="getPosition(index)"
        @click="handleClick(index)"
      >
        <img
          :src="item[options.cover]"
          draggable="false"
        >
        <div
          class="tag"
          :style="{ backgroundColor: item.titleColor }"
        >
          {{ item.typeTitle }}
        </div>
      </div>
      <!-- TODO: 切换按钮图标 -->
      <div
        class="btn prev"
        @click="switchToPrev"
      />
      <div
        class="btn next"
        @click="switchToNext"
      />
    </div>
    <div class="dot-wrapper">
      <div
        v-for="(item, index) in data"
        :key="item[options.cover]"
        class="dot"
        :class="{ active: index === currentIndex }"
        @mouseover="switchTo(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  options:{
    type: Object,
    default: () => ({
      cover: 'imageUrl'
    })
  }
})

// 当前banner图片
let currentIndex = ref(0);
let startPosition = 0;
let timer = 0;
// 是否开始轮播
let started = ref(false)

const endPosition = computed(() => props.data.length - 1)
const leftPosition = computed(() => (currentIndex.value - 1 + props.data.length) % props.data.length);
const rightPosition = computed(() => (currentIndex.value + 1) % props.data.length)

onMounted(() => start()) 

// 开始轮播
const start = () => {
  if (started.value) return;
  started.value = true;
  timer = setInterval(() => {
    switchToNext();
  }, props.interval);
}
// 暂停轮播
const pause = () => {
  if (!started.value) return;
  started.value = false;
  clearInterval(timer);
}
// 跳转到对应图片
const switchTo = index => currentIndex.value = index

// 获取图片位置，添加对应类名
const getPosition = index => {
  if (index === currentIndex.value) {
    return "active";
  } else if (index === leftPosition.value) {
    return "left";
  } else if (index === rightPosition.value) {
    return "right";
  }
  return "";
}
// 下一张
const switchToNext = () => {
  if (currentIndex.value === endPosition.value) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
}
// 上一张
const switchToPrev = () => {
  if (currentIndex.value === startPosition) {
    currentIndex.value = endPosition.value;
  } else {
    currentIndex.value--;
  }
}
// 点击图片，进行操作
const handleClick = index => {
  if (index === currentIndex.value) {
    // console.log(props.data[index]);
  } else if (index === leftPosition.value) {
    switchToPrev()
  } else if (index === rightPosition.value) {
    switchToNext()
  }
}
</script>

<style lang="less" scoped>
.slider-show-wrapper {
  width: 100%;
  height: 230px;
  margin: 20px 0;
  .img-wrapper {
    width: 100%;
    height: 200px;
    position: relative;
    .img-item {
      width: 460px;
      height: 160px;
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
      position: absolute;
      top: calc(50% - 80px);
      left: calc(50% - 230px);
      transition: all 0.3s linear;
      z-index: 1;
      visibility: hidden;
      &.active {
        visibility: visible;
        width: 575px;
        height: 200px;
        top: 0;
        left: calc(50% - 287.5px);
        z-index: 5;
      }
      &.left {
        visibility: visible;
        left: 0;
        z-index: 2;
      }
      &.right {
        visibility: visible;
        left: calc(100% - 460px);
        z-index: 1;
      }
      &.left,
      &.right {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .tag {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        padding: 0 5px;
        border-top-left-radius: 10px;
        background-color: red;
      }
    }
    &:hover{
      .btn{
        opacity: 1;
      }
    }
    .btn {
      opacity: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      cursor: pointer;
      top: calc(50% - 15px);
      z-index: 20;
      transition: opacity .2s linear;
      background-color: rgba(255, 255, 255, 0.3);
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }
  }
  .dot-wrapper {
    width: 100%;
    height: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .dot {
      width: 6px;
      height: 6px;
      margin: 0 4px;
      border-radius: 50%;
      background-color: #e5e5e5;
      &.active {
        background-color: red;
      }
    }
  }
}
</style>
