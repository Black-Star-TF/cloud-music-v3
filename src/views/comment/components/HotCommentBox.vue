<template>
  <div class="hot-comment-box">
    <div class="title">
      精彩评论
    </div>
    <div class="comment-wrapper">
      <comment-item
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
      <!-- 更多按钮 -->
    </div>
  </div>
</template>

<script setup>
import CommentItem from './CommentItem.vue'
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" scoped>
.hot-comment-box{
  .title{
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
  }
}
</style>
