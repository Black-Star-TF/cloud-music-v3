<template>
  <div class="common-loading">
    <div class="icon">
      <div
        v-for="i in count"
        :key="i"
        class="box"
        :style="{ transform: `rotate(${(i - 1) * (360 / count)}deg)` }"
        :class="getActiveClass(i)"
      />
    </div>
    <div class="text">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(10);
let currentIndex = ref(1);
let timer = ref(0);
timer.value = setInterval(() => {
  if (currentIndex.value == count.value) {
    currentIndex.value = 1;
  } else {
    currentIndex.value++;
  }
}, 100);

const getActiveClass = index => {
  if (index === currentIndex.value) {
    return "active1";
  }

  let prev = currentIndex.value === 1 ? count.value : currentIndex.value - 1;
  let next = currentIndex.value === count.value ? 1 : currentIndex.value + 1;
  let arr = [prev, next];
  return arr.includes(index) ? "active2" : "";
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  to {
    transform: rotate(0);
  }
  from {
    transform: rotate(360deg);
  }
}
.common-loading {
  width: 100px;
  height: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
  .icon {
    width: 20px;
    height: 20px;
    position: relative;
    .box {
      width: 20px;
      height: 20px;
      position: absolute;
      &::after {
        content: "";
        display: block;
        width: 2px;
        height: 5px;
        background-color: #5b5b5b;
        margin: 0 auto;
        border-radius: 1px;
      }
      &.active1 {
        &::after {
          background-color: #f0f0f0;
        }
      }
      &.active2 {
        &::after {
          background-color: #aaa;
        }
      }
    }
  }
  .text {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    margin-left: 5px;
    color: var(--color-level3);
  }
}
</style>
