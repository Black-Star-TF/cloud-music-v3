<template>
  <li class="program-item">
    <div class="index">
      {{program.serialNum}}
    </div>
    <div class="cover-box">
      <img
        :src="$formatImgSize(program.coverUrl, 50, 50)"
        class="cover"
      >
      <div class="play-icon">
        <i class="iconfont icon-pausing icon" />
      </div>
    </div>
    <div class="name-box">
      <div
        v-if="isFee"
        :class="['tag', `tag-${program.programFeeType}`]"
      >
        {{tag}}
      </div>
      <div class="name ellipsis1">
        {{program.name}}
      </div>
    </div>
    <div class="play-count">
      <i class="iconfont icon-bofang icon" />{{ $formatCount(program.listenerCount) }}
    </div>
    <div class="praise-count">
      <i class="iconfont icon-zan icon" />{{ $formatCount(program.likedCount) }}
    </div>
    <div class="publish-time">
      {{ dayjs(program.createTime).format('YYYY-MM-DD') }}
    </div>
    <div class="duration">
      {{ $formatDuration(program.duration) }}
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
const props = defineProps({
  program: {
    type: Object,
    required: true,
  }
});
console.log(props.program);
const isFee = computed(() => {
  return props.program.programFeeType !== 0;
});

const tag = computed(() => {
  let tag = '';
  switch(props.program.programFeeType){
    case 5:
      tag = '试听';
      break;
    case 10:
      tag = '付费';
  }
  return tag;
});
</script>

<style lang="less" scoped>
.program-item {
  box-sizing: border-box;
  padding: 0 30px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  line-height: 30px;
  color: #999;
  font-size: 12px;
  &:nth-of-type(2n + 1){
    background: #fafafa;
  }
  &:hover {
    background: #f2f2f3;
  }
  .index {
    width: 40px;
  }
  .cover-box {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    margin: 0 10px;
    .cover{
      width: 100%;
      height: 100%;
    }
    .play-icon {
      position: absolute;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      top: calc(50% - 12.5px);
      left: calc(50% - 12.5px);
      background: rgba(255, 255, 255, .5);
      text-align: center;
      .icon {
        display: inline-block;
        color: #c3473a;
        font-size: 14px;
        margin-left: 2px;
      }
    }
  }
  .name-box {
    flex: 6;
    width: 0;
    color: #333;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    .tag {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      margin-right: 8px;
      padding: 0 3px;
      border-radius: 3px;
      &-5 {
        color: #71b3e2;
        border: 1px solid #71b3e2;
      }
      &-10 {
        color: #c3473a;
        border: 1px solid #c3473a;
      }
    }
    .name {
      width: 0;
      flex: 1;
      display: inline-block;
    }
  }
  .play-count {
    flex: 1;
    .icon {
      font-size: 20px;
      vertical-align: bottom;
    }
  }
  .praise-count {
    flex: 1;
    .icon {
      color: #666;
      margin-right: 3px;
      vertical-align: bottom;
    }
  }
  .publish-time {
    flex: 1.5;
  }
  .duration {
    flex: 1;
  }
}
</style>
