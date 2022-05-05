<template>
  <div class="operations-box">
    <button class="play-all">
      <span class="left">播放全部</span>
      <span class="right">+</span>
    </button>
    <button class="like">
      收藏
    </button>
    <button class="share">
      分享
    </button>
    <button class="download-all">
      下载全部
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      shareCount: 0,
      subscriberCount: 0,
    })
  }
});
</script>

<style lang="less" scoped>
.operations-box{
  height: 30px;
  margin: 20px 0 15px;
  button{
    height: 30px;
    line-height: 30px;
    color: #333;
    border: 1px solid #d9d9d9;
    text-align: center;
    padding: 0 15px;
    font-size: 13px;
    border-radius: 15px;
    cursor: default;
    &.play-all{
      width: 140px;
      padding: 0;
      border: none;
      color: #fff;
      span{
        display: inline-block;
        height: 100%;
        text-align: center;
        line-height: 30px;
      }
      .left{
        width: 107px;
        background: linear-gradient(to right, #e85e4d, #c3473a);;
        border-right: 1px solid #d15f53;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        &:hover{
          background: #bd473b;
        }
      }
      .right{
        width: 30px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background: #ca4c3e;
        &:hover{
          background: #bd473b;
        }
      }
    }
    &:hover{
      background-color: #f2f2f2;
    }
    &:not(:first-child){
      margin-left: 10px;
    }
  }
}
</style>
