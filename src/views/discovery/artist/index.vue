<!--
 * @Author: BlackStar
 * @Date: 2022-03-19 19:20:31
 * @LastEditTime: 2022-03-21 20:01:27
 * @FilePath: /cloud-music-v3/src/views/discovery/artist/index.vue
 * @Description: 
-->
<template>
  <div
    ref="wrapper"
    class="artist-wrapper"
  >
    <div class="page-box">
      <!-- 分类 -->
      <category-selector
        v-model:current-category="currentCategory"
        :data="categoryData"
        @category-change="changeCategory"
      />
      <ul class="artist-container">
        <artist-item
          v-for="(artist, index) in artistList"
          :key="artist.id"
          :artist="artist"
          :index="index + 1"
          :column="column"
        />
      </ul>
      <common-loading v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import CommonLoading from "@/components/common/CommonLoading";
import CategorySelector from "@/components/common/CategorySelector";
import ArtistItem from "./components/ArtistItem.vue";
import { getArtistList } from "@/api/artist";

import { useColumn, useFetchMore } from "@/hooks/index";
let column = useColumn(1060, 6, 5);

const categoryData = reactive([
  {
    key: "area",
    label: "语种：",
    children: [
      { id: "-1", name: "全部" },
      { id: "7", name: "华语" },
      { id: "96", name: "欧美" },
      { id: "8", name: "日本" },
      { id: "16", name: "韩国" },
      { id: "0", name: "其他" },
    ],
  },
  {
    key: "type",
    label: "分类：",
    children: [
      { id: "-1", name: "全部" },
      { id: "1", name: "男歌手" },
      { id: "2", name: "女歌手" },
      { id: "3", name: "乐队" },
    ],
  },
  {
    key: "initial",
    label: "筛选：",
    children: [
      { id: "-1", name: "热门" },
      { id: "a", name: "A" },
      { id: "b", name: "B" },
      { id: "c", name: "C" },
      { id: "d", name: "D" },
      { id: "e", name: "E" },
      { id: "f", name: "F" },
      { id: "g", name: "G" },
      { id: "h", name: "H" },
      { id: "i", name: "I" },
      { id: "j", name: "G" },
      { id: "k", name: "K" },
      { id: "l", name: "L" },
      { id: "m", name: "M" },
      { id: "n", name: "N" },
      { id: "o", name: "O" },
      { id: "p", name: "P" },
      { id: "q", name: "Q" },
      { id: "r", name: "R" },
      { id: "s", name: "S" },
      { id: "t", name: "T" },
      { id: "u", name: "U" },
      { id: "v", name: "V" },
      { id: "w", name: "W" },
      { id: "x", name: "X" },
      { id: "y", name: "Y" },
      { id: "z", name: "Z" },
      { id: "0", name: "#" },
    ],
  },
]);

let currentCategory = ref({
  area: "-1",
  type: "-1",
  initial: "-1",
});

let loading = ref("true");
let artistList = reactive([]);
let hasMore = ref(true);
let limit = ref(30)
let offset = ref(0)
const getArtistListData = async () => {
  loading.value = true;
  const { artists, more } = await getArtistList({
    ...currentCategory.value,
    limit: limit.value,
    offset: offset.value,
  });
  artistList.push(...artists);
  hasMore.value = more;
  loading.value = false;
};

const changeCategory = () => {
  // 请求数据
  hasMore.value = true;
  offset.value = 0
  artistList.length = 0;
  getArtistListData();
};

getArtistListData();

// TODO: 下拉加载更多
const wrapper = useFetchMore(getArtistListData, loading, hasMore, () => offset.value+=limit.value);

</script>

<style lang="less" scoped>
.artist-wrapper {
  height: 100%;
  padding: 15px 0;
  overflow: overlay;
  box-sizing: border-box;
  .artist-container {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
