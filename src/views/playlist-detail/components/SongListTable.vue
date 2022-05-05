<template>
  <table
    class="song-table"
    cellspacing="0"
  >
    <thead>
      <tr class="table-header">
        <th
          v-for="column in tableColumns"
          :key="column.id"
          :class="column.className"
          @click="changeSortBy(column)"
        >
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(song, index) in tableData"
        :key="song.id"
        class="table-row"
        :class="{ active: activeIndex === index }"
        @click="focusOn(index)"
      >
        <td
          v-for="column in tableColumns"
          :key="column.id"
          :class="column.className"
        >
          <template v-if="column.id == 'index'">
            {{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}
          </template>
          <template v-if="column.id == 'name'">
            <div class="song-name">
              <span class="name">
                {{ song.name }}
                <span
                  v-if="song.alias.length > 0"
                  class="alia"
                >（{{ song.alias[0] }}）</span>
              </span>

              <span
                v-if="song.privilege.maxbr === 999000"
                class="iconfont icon-sq sq"
              />
              <span
                v-if="song.fee === 1"
                class="iconfont icon-vip vip"
              />
              <span
                v-if="song.mv"
                class="iconfont icon-video mv"
              />
              <span class="iconfont icon-more more" />
            </div>
          </template>
          <template v-if="column.id == 'artist'">
            <div class="song-artists">
              <template
                v-for="(artist, idx) in song.artists"
                :key="artist.id"
              >
                <span @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
                <i
                  v-if="idx < song.artists.length - 1"
                  class="sp"
                >|</i>
              </template>
            </div>
          </template>
          <template v-if="column.id == 'album'">
            <div class="song-album">
              <span>{{ song.album.name }}</span>
            </div>
          </template>
          <template v-if="column.id == 'duration'">
            {{ $formatDuration(song.duration) }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive } from '@babel/types';
import { ref, computed } from 'vue';
const props = defineProps({
  tableColumns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

let activeIndex = ref(-1);

const focusOn = index => {
  activeIndex.value = index;
};

let sortBy = ref('');
// let sortConfig = reactive({
//   sortBy: '', // name\artist\album
//   order: 0,   // 0 表示不排序； 1 表示升序； 2 表示降序
// });

const tableData = computed(() => {
  if(sortBy.value == 'name'){
    let arr = [...props.data];
    return arr.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }else {
    return props.data;
  }
});

const changeSortBy = column => {
  if(column.id == 'name'){
    sortBy.value = 'name';
  }
};

const toArtistDetail = () => {

};
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.song-table {
  width: 100%;
  font-size: 12.5px;
  table-layout: fixed; // 可设置表格列宽
  .table-header {
    height: 35px;
    line-height: 35px;
    th {
      color: #999;
      font-weight: 400;
      text-align: left;
    }
  }
  .table-row {
    height: 35px;
    line-height: 35px;
    vertical-align: top;
    &:nth-child(2n + 1) {
      background-color: #fafafa;
    }
    &:hover {
      background-color: #f2f2f2;
      .name-column {
        .song-name {
          .more {
            visibility: visible;
          }
        }
      }
    }
    &.active {
      background-color: #f2f2f2;
    }
  }
  .index-column {
    width: 100px;
    color: #bbb;
    font-size: 12px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .name-column {
    width: 38%;
    min-width: 0;
    padding-right: 10px;

    .song-name {
      display: flex;
      align-items: center;
      .name {
        color: #333;
        .ellipsis;
        .alia {
          color: #999;
          font-size: 12px;
          height: 25px;
          line-height: 20px;
        }
      }
      .vip {
        color: #c3473a;
        font-size: 18px;
        margin-left: 5px;
      }
      .sq {
        color: #c3473a;
        font-size: 18px;
        margin-left: 5px;
      }
      .mv {
        color: #c3473a;
        font-size: 18px;
        margin-left: 2px;
        font-weight: bold;
        cursor: pointer;
      }
      .more {
        color: #999;
        margin-left: 5px;
        visibility: hidden;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
    }
  }
  .artist-column {
    width: 17%;
    min-width: 0;
    padding-right: 10px;
    .song-artists {
      width: 100%;
      .ellipsis;
      color: #666;
      span {
        cursor: pointer;
        &:hover {
          color: #333;
        }
      }
      .sp{
        margin: 0 5px;
      }
    }
  }
  .album-column {
    width: 23%;
    min-width: 0;
    padding-right: 10px;
    position: relative;
    .song-album {
      width: 100%;
      .ellipsis;
      span {
        cursor: pointer;
        color: #666;
        &:hover {
          color: #333;
        }
      }
    }
  }
  .duration-column {
    min-width: 0;
    font-size: 12px;
    color: #bbb;
  }
}
</style>
