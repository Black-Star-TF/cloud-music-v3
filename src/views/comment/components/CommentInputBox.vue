<template>
  <div class="comment-input-box">
    <textarea
      class="textarea"
      maxlength="140"
      placeholder="请输入评论或@朋友"
    />
    <div class="operation-wrapper">
      <div class="left">
        <span class="icon">@</span>
        <span class="icon">#</span>
      </div>
      <button class="btn">
        评论
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.comment-input-box {
  width: 100%;
  margin-bottom: 15px;
  .textarea {
    margin: 0;
    padding: 0;
    outline: none;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    width: 100% !important;
    height: 65px !important;
    line-height: 15px;
    padding: 5px;
    font-size: 12.5px;
    border-radius: 5px;
    color: #333;
    resize: none;
    display: block;
    &::-webkit-input-placeholder {
      color: #bbb;
      line-height: 15px;
    }
    &:-moz-placeholder {
      color: #bbb;
      line-height: 15px;
    }
    &::-moz-placeholder {
      color: #bbb;
      line-height: 15px;
    }
    &:-ms-input-placeholder {
      color: #bbb;
      line-height: 15px;
    }
  }
  .operation-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .btn {
      width: 60px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      text-align: center;
      border: 1px solid#d9d9d9;
      font-size: 13px;
      color: #333;
      cursor: default;
      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
