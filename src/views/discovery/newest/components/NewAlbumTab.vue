<template>
  <div class="new-album-tab-wrapper">
    <common-wrapper>
      <template #left>
        <ul class="area-list">
          <li
            v-for="area in areaList"
            :key="area.id"
            :class="{ active: area.id == currentAreaId }"
            class="area-item"
            @click="changeArea(area.id)"
          >
            {{ area.name }}
          </li>
        </ul>
      </template>
      <template #right>
        <type-selector
          v-model:current-type="currentType"
          :type-list="typeList"
          :options="{ name: 'name', id: 'id' }"
          @type-change="changeType"
        />
      </template>
      <template #content>
        <div class="week-data album-wrapper">
          <div
            v-if="!loading && weekAlbumData.length > 0"
            class="title-wrapper"
          >
            <div class="title">
              本周新碟
            </div>
          </div>
          <ul class="flex-box">
            <album-item
              v-for="(album, index) in weekAlbumData"
              :key="album.id"
              :album="album"
              :index="index + 1"
              :column="column"
            />
          </ul>
        </div>
        <div class="month-data album-wrapper">
          <div
            v-if="!loading && monthAlbumData.length > 0"
            class="title-wrapper"
          >
            <div class="title">
              <div class="month">
                {{ getDate(monthAlbumData[0].publishTime).month }}
              </div>
              <div class="year">
                {{ getDate(monthAlbumData[0].publishTime).year }}
              </div>
            </div>
          </div>
          <ul class="flex-box">
            <album-item
              v-for="(album, index) in monthAlbumData"
              :key="album.id"
              :album="album"
              :column="column"
              :index="index + 1"
            />
          </ul>
        </div>
        <common-loading v-if="loading" />
      </template>
    </common-wrapper>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import CommonWrapper from "@/components/common/CommonWrapper";
import CommonLoading from "@/components/common/CommonLoading";
import AlbumItem from "./AlbumItem.vue";
import { getNewAlbum } from "@/api/album";
import TypeSelector from "@/components/common/TypeSelector";

import { useColumn } from "@/hooks/index.js";
let column = useColumn(1150, 5, 4);

const areaList = [
  {
    id: "ALL",
    name: "全部",
  },
  {
    id: "ZH",
    name: "华语",
  },
  {
    id: "EA",
    name: "欧美",
  },
  {
    id: "KR",
    name: "韩国",
  },
  {
    id: "JP",
    name: "日本",
  },
];
const typeList = [
  {
    id: "hot",
    name: "推荐",
  },
  {
    id: "new",
    name: "全部",
  },
];
let currentAreaId = ref("ALL");
let currentTypeId = ref("hot");
let currentType = ref({
  id: "hot",
  name: "推荐",
})
let loading = ref(true);
const weekAlbumData = reactive([]);
const monthAlbumData = reactive([]);
const albumData = reactive({
  weekData: [],
  monthData: [],
});

const getDate = timestamp => {
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  return {
    year,
    month: month >  9 ? month : '0' + month
  }
}

let loadWeekData = ref(true);
const limit = ref(20);
let pageIndex = ref(1);
let count = computed(() => limit.value * pageIndex.value);
const getNewAlbumData = async () => {
  loading.value = true;
  albumData.weekData = [];
  albumData.monthData = [];
  weekAlbumData.length = 0;
  monthAlbumData.length = 0;
  pageIndex.value = 1;
  loadWeekData.value = true;
  const { weekData, monthData } = await getNewAlbum({
    area: currentAreaId.value,
    type: currentType.value.id,
  });
  albumData.weekData = weekData || [];
  albumData.monthData = monthData || [];
  if (albumData.weekData.length > 0) {
    weekAlbumData.push(...albumData.weekData.slice(0, count.value));
  } else {
    loadWeekData.value = false;
    monthAlbumData.push(...albumData.monthData.slice(0, count.value));
  }
  loading.value = false;
};

getNewAlbumData();

const changeArea = id => {
  if(id === currentAreaId.value) return 
  currentAreaId.value = id;
  getNewAlbumData();
};
const changeType = () => {
  getNewAlbumData();
};

// 前端分页
const getMoreData = () => {
  if (loadWeekData.value) {
    pageIndex.value++;
    weekAlbumData.length = 0;
    weekAlbumData.push(...albumData.weekData.slice(0, count.value));
    if (weekAlbumData.length === albumData.weekData.length) {
      loadWeekData.value = false;
      pageIndex.value = 0;
    }
  } else {
    pageIndex.value++;
    monthAlbumData.length = 0;
    monthAlbumData.push(...albumData.monthData.slice(0, count.value));
    if (monthAlbumData.length === albumData.monthData.length) {
      hasMore.value = false;
    }
  }
};

let hasMore = ref(true);

defineExpose({
  getMoreData,
  hasMore,
});
</script>

<style lang="less" scoped>
.new-album-tab-wrapper {
  .area-list {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .area-item {
      margin-right: 30px;
      height: 20px;
      line-height: 20px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #000;
      }
      &.active {
        color: #000;
        font-weight: 500;
      }
    }
  }

  .album-wrapper {
    display: flex;
    position: relative;

    .title-wrapper {
      width: 60px;
      min-height: 50px;
      align-self: stretch;
      .title {
        text-align: center;
        position: sticky;
        width: 33px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
        top: 0;
        left: 0;
        overflow: hidden;
        .year{
          width: 100%;
          font-size: 14px;
          height: 18px;
          line-height: 18px;
        }
        .month{
          font-size: 25px;
          height: 25px;
          line-height: 25px;
          width: 100%;
        }
      }
    }
    .flex-box {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
