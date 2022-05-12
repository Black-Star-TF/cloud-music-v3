<template>
  <div class="header-detail">
    <img
      :src="$formatImgSize(options.cover, 500,500)"
      class="cover"
    >
    <div class="detail-wrapper">
      <div class="name">
        <span class="type-tag">{{ typeName }}</span>{{ options.name }}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  options: {
    type: Object,
    required: true,
  }
});

const typeName = computed(() => {
  let type = '';
  switch(props.options.type){
    case 'playlist':
      type = '歌单';
      break;
    case 'album':
      type = '专辑';
      break;
    case 'radio':
      type = '电台';
      break;
    case 'fee-radio':
      type = '付费精品';
      break;
  }
  return type;
});
</script>

<style lang="less" scoped>
.header-detail {
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
    .name{
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      font-weight: 500;
      color: #333;
      .type-tag{
        display: inline-block;
        padding: 0 5px;
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
  }
}
</style>
