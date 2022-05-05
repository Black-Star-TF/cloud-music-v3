<template>
  <div class="description-tab">
    <h2 class="title">
      专辑介绍
    </h2>
    <p class="content">
      {{ album.description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  album: {
    type: Object,
    required: true,
  }
});
</script>

<style lang="less" scoped>
.description-tab{
  padding: 0 30px;
  .title{
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin: 15px 0;
  }
  .content{
    white-space: pre-wrap;
    font-size: 13px;
    color: #bbb;
    line-height: 25px;
  }
}
</style>
