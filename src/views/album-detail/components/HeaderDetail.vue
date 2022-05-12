<template>
  <header-detail :options="options">
    <operation-box
      layout="play,like,share,download"
      :option="operationOption"
    />
    <div class="artist">
      <span class="label">歌手</span><span>：</span><span class="name">{{ album.artist.name }}</span>
    </div>
    <div class="publish-time">
      <span class="label">时间</span><span>：</span><span class="time">{{ dayjs(album.publishTime).format('YYYY-MM-DD') }}</span>
    </div>
  </header-detail>
</template>

<script setup>
import { computed } from "vue";
import HeaderDetail from "@/components/header-detail/HeaderDetail";
import OperationBox from "@/components/operation-box/OperationBox";
import dayjs from 'dayjs';
const props = defineProps({
  album: {
    type: Object,
    required: true,
  }
});
const options = computed(() => {
  return {
    cover: props.album.blurPicUrl,
    name: props.album.name,
    type: 'album',
    typeName: '专辑',
  };
});
const operationOption = computed(() => {
  return {
    shareCount: props.album.shareCount || 0,
    subscribedCount: props.album.subscribedCount || 0,
  };
});
</script>

<style lang="less" scoped>
.artist {
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  
  .label {
    color: #333;
  }
  .name {
    cursor: pointer;
    color: #5a7cab;
    margin-right: 5px;
    &:hover {
      color: #2757aa;
    }
  }
}
.publish-time {
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  .label {
    color: #333;
  }
  .time {
    color: #666;
  }
}
</style>
