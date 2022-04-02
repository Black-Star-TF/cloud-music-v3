<template>
  <div class="header-detail">
    <img
      :src="$formatImgSize(playlist.coverImgUrl, 500,500)"
      class="cover"
    >
    <div class="detail-wrapper">
      <div class="playlist-name">
        <span class="type-tag">歌单</span>{{ playlist.name }}
      </div>
      <div class="create-info">
        <img
          :src="$formatImgSize(playlist.creator.avatarUrl, 50,50)"
          class="creator-avatar"
        >
        <span class="creator-name">{{ playlist.creator.nickname }}</span>
        <span class="create-data">{{ dayjs(playlist.createTime).format('YYYY-MM-DD') }}创建</span>
      </div>
      <div class="operations-wrapper">
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
          下载
        </button>
      </div>
      <div
        v-if="playlist.tags.length > 0"
        class="tag-wrapper"
      >
        <span class="label">标签</span><span>：</span><span
          v-for="tag in playlist.tags"
          :key="tag"
          class="tag"
        >{{ tag }}</span>
      </div>
      <div class="track-detail">
        <span class="label">歌曲数</span><span>：</span><span class="count">{{ playlist.trackCount }}</span>
        <span class="label">播放数</span><span>：</span><span class="count">{{ $formatCount(playlist.playCount) }}</span>
      </div>
      <div
        v-if="playlist.description"
        class="desc"
      >
        <span class="label">简介</span><span>：</span><span class="content">{{ playlist.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  }
})
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.header-detail{
 margin: 15px 30px;
 display: flex;
  .cover{
    width: 200px;
    height: 200px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    margin-right: 30px;
  }
  .detail-wrapper{
    flex: 1;
    min-width: 0;
    .playlist-name{
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      font-weight: 500;
      color: #333;
      .type-tag{
        display: inline-block;
        width: 36px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 3px;
        font-size: 13px;
        border: 1px solid #c3473a;
        color: #c3473a;
        position: relative;
        top: -3px;
        margin-right: 10px;
      }
    }
    .create-info{
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      margin: 10px 0;
      .creator-avatar{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
      }
      .creator-name{
        vertical-align: middle;
        color: #5a7cab;
        cursor: pointer;
        &:hover{
          color: #2757aa;
        }
      }
      .create-data{
        vertical-align: middle;
        margin-left: 10px;
        color: #666;
      }
    }
    .operations-wrapper{
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
    .tag-wrapper{
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      color: #333;
      .label{
        display: inline-block;
        width: 36px;
        text-align-last: justify;
      }
      .tag{
        cursor: pointer;
        color: #5a7cab;
        margin-right: 5px;
        &:hover{
          color: #2757aa;
        }
      }
    }
    .track-detail{
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      color: #333;
      .label{
        width: 36px;
        display: inline-block;
        text-align-last: justify;
        &:not(:first-of-type){
          margin-left: 15px;
        }
      }
      .count{
        color: #666;
      }
    }
    .desc{
      font-size: 12px;
      line-height: 22px;
      white-space: pre;
      height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      .label{
        width: 36px;
        text-align-last: justify;
        display: inline-block;
      }
      .content{
        color: #666;
      }
      &.visible{
        height: unset;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
