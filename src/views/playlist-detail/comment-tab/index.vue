<template>
  <div class="comment-tab">
    <common-input-box />
    <div
      ref="anchor"
      class="anchor"
    />
    <hot-comment-box
      v-if="showHotComment"
      :comments="commentData.hotComments"
    />
    <new-comment-box
      v-if="showNewComment"
      v-model:current-page="currentPage"
      :total-count="commentData.total"
      :page-size="pageSize"
      :comments="commentData.comments"
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
import { ref, nextTick, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import CommonInputBox from "@/views/comment/components/CommentInputBox.vue";
import HotCommentBox from "@/views/comment/components/HotCommentBox.vue";
import NewCommentBox from "@/views/comment/components/NewCommentBox";
import CommonLoading from "@/components/common/CommonLoading";
import { getPlaylistComments } from "@/api/playlist";
const anchor = ref(null);
let loading = ref(false);
const route = useRoute();
let id = route.query.id;
const commentData = reactive({
  hotComments: [],
  comments: [],
  moreHot: false,
  total: 0,
});

let pageSize = ref(20);
let currentPage = ref(1);
let offset = computed(() => (currentPage.value - 1) * pageSize.value);

const getCommentData = async () => {
  const { hotComments, comments, moreHot, total } = await getPlaylistComments({
    id,
    limit: pageSize.value,
    offset: offset.value,
  });
  commentData.hotComments = hotComments;
  commentData.comments = comments;
  commentData.moreHot = moreHot;
  commentData.total = total;
  loading.value = false;
};
getCommentData();

const showHotComment = computed(() => {
  return (
    commentData.hotComments &&
    commentData.hotComments.length > 0 &&
    currentPage.value === 1
  );
});
const showNewComment = computed(() => {
  return commentData.comments && commentData.comments.length > 0;
});

const handlePageChange = async () => {
  loading.value = true;
  getCommentData();
  nextTick(() => {
    anchor.value.scrollIntoView();
  });
};
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
