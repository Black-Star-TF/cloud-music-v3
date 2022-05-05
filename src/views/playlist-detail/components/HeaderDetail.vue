<template>
  <header-detail :options="options">
    <div class="create-info">
      <img
        :src="$formatImgSize(playlist.creator.avatarUrl, 50,50)"
        class="creator-avatar"
      >
      <span class="creator-name">{{ playlist.creator.nickname }}</span>
      <span class="create-data">{{ dayjs(playlist.createTime).format('YYYY-MM-DD') }}创建</span>
    </div>
    <operation-box />
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
  </header-detail>
</template>

<script setup>
import { computed } from "vue";
import dayjs from 'dayjs';
import HeaderDetail from "@/components/header-detail/HeaderDetail";
import OperationBox from "@/components/operation-box/OperationBox";
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  }
});
const options = computed(() => {
  return {
    cover: props.playlist.coverImgUrl,
    name: props.playlist.name,
    type: 'playlist',
    typeName: '歌单',
  };
});
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
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
</style>
