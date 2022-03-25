<template>
  <div
    v-if="highQualityPlaylist.id"
    class="high-quality-playlist-banner"
    :style="{
      backgroundImage: `url(${$formatCount(highQualityPlaylist.coverImgUrl,500,500)})`,
    }"
    @click="emits('click')"
  >
    <img :src="$formatCount(highQualityPlaylist.coverImgUrl, 500, 500)">
    <div class="playlist-info">
      <div class="tag">
        精品歌单
      </div>
      <div class="name">
        {{ highQualityPlaylist.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  highQualityPlaylist: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(['click'])
</script>

<style lang="less" scoped>
.high-quality-playlist-banner {
  height: 170px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 30% 50%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(50px);
  }
  img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    margin-right: 10px;
    position: relative;
    z-index: 2;
  }
  .playlist-info {
    height: 140px;
    flex: 1;
    position: relative;
    z-index: 2;
    .tag {
      width: 100px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      box-sizing: border-box;
      border-radius: 14px;
      border: 1px solid #deac67;
      color: #deac67;
      font-size: 14px;
      margin: 20px 0;
    }
    .name {
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
