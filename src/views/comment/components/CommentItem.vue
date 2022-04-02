<template>
  <div class="comment-item-box">
    <div class="user-avatar-box">
      <div class="user-avatar">
        <img :src="comment.user.avatarUrl" class="avatar">
      </div>
    </div>
    <div class="comment-detail-box">
      <div class="comment-content">
        <span class="user-name">{{comment.user.nickname}}：</span>
        <span class="content">{{comment.content}}</span>
      </div>
      <div class="reply-from" v-if="comment.beReplied.length > 0">
        <span class="user-name">{{comment.beReplied[0].user.nickname}}：</span>
        <span class="content">{{comment.beReplied[0].content}}</span>
      </div>
      <div class="comment-info">
        <span class="comment-time">{{dayjs(comment.time).format('YYYY年MM月DD日 HH:MM')}}</span>
        <span class="operation"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  }
})
</script>

<style lang="less" scoped>
.comment-item-box{
  display: flex;
  margin-bottom: 20px;
  .user-avatar-box{
    width: 38px;
    margin-right: 15px;
    .user-avatar{
      width: 38px;
      height: 38px;
      margin-top: 3px;
      border: 1px solid #f2f2f2;
      border-radius: 50%;
      .avatar{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .comment-detail-box{
    flex: 1;
    padding-bottom: 25px;
    border-bottom: 1px solid #f2f2f2;
    .comment-content{
      line-height: 18px;
      font-size: 13px;
      .user-name{
        color: #5a7cab;
        cursor: pointer;
        &:hover{
          color: #2757aa;
        }
      }
      .content{
        color: #333;
      }
    }
    .reply-from{
      padding: 5px 8px;
      margin-top: 10px;
      line-height: 20px;
      font-size: 12.5px;
      border-radius: 5px;
      background-color: #f5f5f5;;
      .user-name{
        color: #5a7cab;
        cursor: pointer;
        &:hover{
          color: #2757aa;
        }
      }
      .content{
        color: #666;
      }
    }
    .comment-info{
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      .comment-time{
        font-size: 12px;
        color: #bbb;
      }
    }
  }
}
</style>
