<template>
  <div class="new-album-tab-wrapper">
    <common-wrapper>
      <template #left>
        <area-selector
          v-model:current-area="currentArea"
          :area-list="areaList"
          @area-change="handleAreaChange"
        ></area-selector>
      </template>
      <template #right>
        <type-selector
          v-model:current-type="currentType"
          :type-list="typeList"
          :options="{ name: 'name', id: 'id' }"
          @type-change="handleTypeChange"
        />
      </template>
      <template #content>
        <div class="week-data album-wrapper">
          <div
            v-if="!loading && weekData.length > 0"
            class="title-wrapper"
          >
            <div class="title">
              本周新碟
            </div>
          </div>
          <ul class="flex-box">
            <album-item
              v-for="(album, index) in weekData"
              :key="album.id"
              :album="album"
              :index="index + 1"
              :column="column"
            />
          </ul>
        </div>
        <div class="month-data album-wrapper">
          <div
            v-if="!loading && monthData.length > 0"
            class="title-wrapper"
          >
            <div class="title">
              <div class="month">
                {{ getDate(monthData[0].publishTime).month }}
              </div>
              <div class="year">
                {{ getDate(monthData[0].publishTime).year }}
              </div>
            </div>
          </div>
          <ul class="flex-box">
            <album-item
              v-for="(album, index) in monthData"
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
import AreaSelector from "../components/AreaSelector";
import TypeSelector from "@/components/common/TypeSelector";
import AlbumItem from "../components/AlbumItem.vue";
import useData from './index';

const {
  areaList,
  typeList,
  loading,
  column,
  currentArea,
  currentType,
  weekData,
  monthData,
  handleAreaChange,
  handleTypeChange,
  getDate,
} = useData();
</script>

<style lang="less" scoped>
.new-album-tab-wrapper {
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
