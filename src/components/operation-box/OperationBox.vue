<template>
  <div class="operations-box">
    <!-- 立即购买 -->
    <button
      v-if="operations.includes('buy')"
      class="buy"
    >
      <i class="iconfont icon-gouwuche icon"></i>立即购买
    </button>
    <!-- 免费试听 -->
    <button
      v-if="operations.includes('probation')"
      class="probation"
    >
      <i class="iconfont icon-bofang icon"></i>免费试听
    </button>
    <button
      v-if="operations.includes('play')"
      class="play"
    >
      <span class="left"><i class="iconfont icon-bofang icon"></i>播放全部</span>
      <span class="right">
        <i class="iconfont icon-tianjia icon"></i>
      </span>
    </button>
    <button
      v-if="operations.includes('like')"
      class="like"
    >
      <i class="iconfont icon-shoucang icon"></i>收藏({{$formatCount(option.subscribedCount)}})
    </button>
    <button
      v-if="operations.includes('subscribe')"
      class="subscribe"
    >
      <i class="iconfont icon-star icon"></i>订阅({{$formatCount(option.subscribedCount)}})
    </button>
    <button
      v-if="operations.includes('share')"
      class="share"
    >
      <i class="iconfont icon-share icon"></i>分享({{$formatCount(option.shareCount)}})
    </button>
    <button
      v-if="operations.includes('download')"
      class="download"
    >
      <i class="iconfont icon-download icon"></i>下载全部
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  option: {
    type: Object,
    default: () => ({
      shareCount: 0,
      subscribedCount: 0,
    })
  },
  layout: {
    type: String,
    default: 'play,like,share,download'
  },
});
const operations = computed(() => {
  return props.layout.split(',');
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
    &.buy{
      color: #fff;
      background: linear-gradient(to right, #e85e4d, #c3473a);
      border: none;
    }
    &.probation {
      border: 1px solid #c3473a;
      color: #c3473a;
      .icon {
        font-size: 25px;
      }
    }

    &.play{
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
        background: linear-gradient(to right, #e85e4d, #c3473a);
        border-right: 1px solid #d15f53;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        &:hover{
          background: #bd473b;
        }
        .icon {
          font-size: 25px;
          margin-right: 3px;
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
        .icon {
          font-size: 20px;
        }
      }
    }
    &:hover{
      background-color: #f2f2f2;
    }
    &:not(:first-child){
      margin-left: 10px;
    }

    &.like{
      .icon {
        font-size: 18px;
      }
    }

    &.subscribe {
      .icon {
        font-size: 20px;
      }
    }

    &.share {
      .icon {
        font-size: 15px;
      }
    }
    &.download {
      .icon {
        font-size: 15px;
      }
    }
    .icon {
      vertical-align: bottom;
      margin-right: 5px;
    }
  }
}
</style>
