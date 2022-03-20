<template>
  <div class="artist-list">
    <span 
      v-for="(artist, index) in artists" 
      :key="artist.id"
    >
      <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
      <i 
        v-if="index < artists.length - 1" 
        class="sp"
      > | </i>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  artists: {
    type: Object,
    required: true,
  },
});

const toArtistDetail = id => {
  console.log(id);
}
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.artist-list {
  height: 15px;
  line-height: 15px;
  width: 100%;
  font-size: 12.5px;
  .ellipsis;
  span {
    color: #626262;
    cursor: pointer;
    &:hover {
      color: #424242;
    }
  }
  .sp {
    color: #999999;
  }
}
</style>
