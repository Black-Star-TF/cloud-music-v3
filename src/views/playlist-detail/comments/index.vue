<template>
  <div class="comment-tab">
    <comment-input-box />
    <div
      ref="anchor"
      class="anchor"
    />
    <hot-comment-box
      v-if="showHotComments"
      :comments="hotComments"
      :more="moreHot"
    />
    <new-comment-box
      v-if="showNewComments"
      v-model:current-page="currentPage"
      :total-count="total"
      :page-size="pageSize"
      :comments="comments"
      :loading="loading"
      @current-change="handlePageChange"
    />
    <div
      v-if="loading"
      class="loading-wrapper"
    >
      <common-loading />
    </div>
  </div>
</template>

<script setup>
import CommentInputBox from "@/views/comment/components/CommentInputBox.vue";
import HotCommentBox from "@/views/comment/components/HotCommentBox.vue";
import NewCommentBox from "@/views/comment/components/NewCommentBox";
import useComments from "@/hooks/useComments.js";
import { playlistApi } from "@/api";
const {
  loading,
  hotComments,
  comments,
  moreHot,
  total,
  currentPage,
  pageSize,
  anchor,
  showHotComments,
  showNewComments,
  handlePageChange,
} = useComments(playlistApi);
</script>

<style lang="less" scoped>
.comment-tab {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 30px;
  .anchor{
    height: 1px;
  }
  .loading-wrapper{
    height: calc(100vh - 110px);
    .common-loading{
      margin-top: 20%;
    }
  }
}
</style>
