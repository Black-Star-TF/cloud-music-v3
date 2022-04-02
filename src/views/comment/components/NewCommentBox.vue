<template>
  <div class="new-comment-box">
    <div class="title">
      最新评论
    </div>
    
    <div
      v-if="!loading"
      class="comment-wrapper"
    >
      <comment-item
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
      <common-pagination
        v-if="totalCount > pageSize"
        v-model:current-page="_currentPage"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CommentItem from "./CommentItem.vue";
import CommonPagination from "@/components/common/CommonPagination";

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

let _currentPage = ref(1);

const emits = defineEmits(['update:current-page', 'current-change'])
const handlePageChange = () => {
  emits('update:current-page', _currentPage.value)
  emits('current-change', _currentPage.value)
}

watch(
  () => props.currentPage,
  val => {
    _currentPage.value = val;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.new-comment-box {
  .title {
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
  }
  
}
</style>
