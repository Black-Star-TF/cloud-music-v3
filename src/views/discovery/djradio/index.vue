<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:20:31
 * @LastEditTime: 2022-03-19 21:49:10
 * @FilePath: /cloud-music-v3/src/views/discovery/djradio/index.vue
 * @Description: 
-->
<!--
 * @Author: BlackStar
 * @Date: 2022-03-15 12:37:58
 * @LastEditTime: 2022-03-19 15:47:38
 * @FilePath: /cloud-music-v3-ts/src/views/discovery/djradio/index.vue
 * @Description: 
-->
<template>
  <div class="djradio-wrapper">
    <slider-show
      v-if="banners.length > 0"
      :data="banners"
      :options="{ cover: 'pic' }"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getBanner } from "@/api/djradio";
import SliderShow from "@/components/common/SliderShow.vue";

// 电台banner
let banners = reactive([]);
async function getBannerData() {
  const { data } = await getBanner();
  banners.length = 0;
  banners.push(...data);
}
getBannerData();
</script>

<style lang="less" scoped>
.djradio-wrapper {
  height: 100%;
  overflow: overlay;
  padding: 0 30px;
}
</style>
