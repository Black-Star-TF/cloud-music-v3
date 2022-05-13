<template>
  <header-detail :options="options">
    <div class="create-info">
      <img
        :src="$formatImgSize(playlist.creator.avatarUrl, 50, 50)"
        class="creator-avatar"
      >
      <span class="creator-name">{{ playlist.creator.nickname }}</span>
      <span class="create-data">{{ dayjs(playlist.createTime).format('YYYY-MM-DD') }}创建</span>
    </div>
    <operation-box
      layout="play,like,share,download"
      :option="operationOption"
    />
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
      <div class="content-wrapper">
        
        <div
          class="line"
          :class="{'ellipsis1' : !showMore}"
        >
          <span class="label">简介</span><span>：</span><span class="content">{{ desc[0] }}</span>
        </div>
        <div
          v-if="showMore"
          class="more"
        >
          <span>{{ moreDesc }}</span>
        </div>
      </div>
      <div
        v-if="desc.length > 1"
        class="collapse"
        @click="toggle"
      >
        <i
          v-if="showMore"
          class="iconfont icon-shang"
        ></i>
        <i
          v-else
          class="iconfont icon-xia"
        ></i>
      </div>
    </div>
  </header-detail>
</template>

<script setup>
import { computed, ref } from "vue";
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
const operationOption = computed(() => {
  return {
    shareCount: props.playlist.shareCount || 0,
    subscribedCount: props.playlist.subscribedCount || 0,
  };
});

const desc =computed(() => {
  return props.playlist.description.trim().split('\n').filter(item => !!item);
});

const showMore = ref(false);

const moreDesc = computed(() => {
  return desc.value.slice(1).join('\n');
});

const toggle = () => {
  showMore.value= !showMore.value;
};
</script>

<style lang="less" scoped>
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
  font-size: 12.5px;
  line-height: 25px;
  position: relative;
  .content-wrapper {
    width: calc(100% - 20px);
    white-space: pre-wrap;
    color: #666;
    .label{
      width: 36px;
      color: #333;
      text-align-last: justify;
      display: inline-block;
    }
  }
  .collapse {
    width: 10px;
    height: 10px;
    line-height: 10px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 0;
    vertical-align: bottom;
    color: #999;
  }
}
</style>
