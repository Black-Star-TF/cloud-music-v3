<!--
 * @Author: BlackStar
 * @Date: 2022-03-18 21:15:58
 * @LastEditTime: 2022-03-19 22:37:36
 * @FilePath: /cloud-music-v3/src/components/common/CommonPagination.vue
 * @Description: 
-->
<template>
  <div class="common-pagination">
    <button
      class="prev"
      :class="{ disabled: currentPage === 1 }"
      @click="changeCurrentPage(currentPage - 1)"
    >
      &lt;
    </button>
    <ul class="pager-wrapper">
      <!-- 第一页 -->
      <li
        v-if="pageCount > 1"
        :class="{ active: currentPage === 1 }"
        @click="changeCurrentPage(1)"
      >
        1
      </li>
      <!-- 省略 -->
      <li
        v-if="showPrevEllipsis"
        class="ellipsis"
      >
        ...
      </li>
      <!-- 显示页码 -->
      <li
        v-for="page in pagers"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="changeCurrentPage(page)"
      >
        {{ page }}
      </li>
      <!-- 省略 -->
      <li
        v-if="showNextEllipsis"
        class="ellipsis"
      >
        ...
      </li>
      <!-- 最后一页 -->
      <li
        :class="{ active: currentPage === pageCount }"
        @click="changeCurrentPage(pageCount)"
      >
        {{ pageCount }}
      </li>
    </ul>
    <button
      class="next"
      :class="{ disabled: currentPage === pageCount }"
      @click="changeCurrentPage(currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  // 总数
  total: {
    type: Number,
    default: 1,
  },
  // 每页条数
  pageSize: {
    type: Number,
    default: 10,
  },
  // 当前页码
  currentPage: {
    type: Number,
    default: 1,
  },
  // 是否在只有一页时隐藏
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  pagerCount: {
    type: Number,
    default: 5,
  },
})
// 总页数
const pageCount = computed(()=> Math.ceil(props.total / props.pageSize))
// 是否显示前置的省略
const showPrevEllipsis = computed(() => props.currentPage - (props.pagerCount - 1) / 2 > 1)
// 是否显示后置的省略
const showNextEllipsis = computed(() => props.currentPage + (props.pagerCount - 1) / 2 < pageCount.value)
// 要显示的页码
const pagers = computed(() => {
  let offset = (props.pagerCount - 1) / 2;
  const array = [];
  if (showPrevEllipsis.value && showNextEllipsis.value) {
    for (let i = props.currentPage - offset; i <= props.currentPage + offset; i++) {
      array.push(i);
    }
  } else if (!showPrevEllipsis.value && showNextEllipsis.value) {
    for (let i = 2; i < 2 + props.pagerCount; i++) {
      array.push(i);
    }
  } else if (showPrevEllipsis.value && !showNextEllipsis.value) {
    for (let i = pageCount.value - props.pagerCount; i < pageCount.value; i++) {
      array.push(i);
    }
  } else {
    for (let i = 2; i < pageCount.value; i++) {
      array.push(i);
    }
  }
  return array;
})
// 页码改变
const emits = defineEmits('update:current-page','current-change');
const changeCurrentPage = pageNo => {
  emits("update:current-page", pageNo);
  emits("current-change", pageNo);
}
</script>

<style lang="less" scoped>
.common-pagination {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    box-sizing: content-box;
    width: 23px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    font-size: 13px;
    color: #666666;
    margin: 0 2px;
    &:hover {
      color: #333333;
    }
    &.disabled {
      color: #666666;
      cursor: default;
      pointer-events: none;
    }
  }
  .pager-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 23px;
      height: 23px;
      text-align: center;
      line-height: 23px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      font-size: 13px;
      color: #666666;
      margin: 0 2px;
      cursor: pointer;
      &:hover {
        color: #333333;
      }
      &.ellipsis {
        cursor: default;
        color: #666666;
      }
      &.active {
        cursor: default;
        color: #ffffff;
        background-color: #c3473a;
        border-color: #c3473a;
      }
    }
  }
}
</style>
