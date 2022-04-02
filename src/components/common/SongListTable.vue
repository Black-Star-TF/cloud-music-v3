<template>
  <table
    class="song-list-table"
    cellspacing="0"
  >
    <thead>
      <tr class="table-header">
        <th class="index-column" />
        <th class="name-column">
          音乐标题
        </th>
        <th class="artist-column">
          歌手
        </th>
        <th class="album-column">
          专辑
        </th>
        <th class="duration-column">
          时长
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(song, index) in songList"
        :key="song.id"
        class="table-row"
        :class="{active: activeIndex === index}"
        @click="focusOn(index)"
      >
        <td class="index-column">
          {{ index + 1 > 9 ? index + 1 : "0" + (index + 1) }}
        </td>
        <td class="name-column">
          <div
            class="song-name"
          >
            <span
              class="name"
              v-html="markKeywords(song.name, keywords)"
            />
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
            <span
              class="iconfont icon-more more"
            />
          </div>
          <div
            v-if="!showLyric&&song.alia.length > 0"
            class="alia"
            v-html="markKeywords(song.alia[0], keywords)"
          />
          <div
            v-if="showLyric"
            class="song-lyric"
            :class="{expanded: expandedList.includes(index)}"
          >
            <template
              v-for="(row, idx) in getLyrics(song.lyrics,index)"
              :key="row"
            >
              <span
                v-if="idx===0"
                class="artist"
              >
                {{ row.replace('<b>', '').replace('</b>', '') }}
              </span>
              <span
                v-else
                class="lyric-row"
              >{{ row }}</span>
            </template>
          </div>
        </td>
        <td class="artist-column">
          <div class="song-artists">
            <template
              v-for="(artist, idx) in song.ar"
              :key="artist.id"
            >
              <span
                @click="toArtistDetail(artist.id)"
                v-html="markKeywords(artist.name, keywords)"
              />
              <i
                v-if="idx < song.ar.length - 1"
                class="sp"
              > | </i>
            </template>
          </div>
        </td>
        <td class="album-column">
          <div class="song-album">
            <span v-html="markKeywords(song.al.name, keywords)" />
          </div>
          <div
            v-if="showLyric"
            class="operation-wrapper"
          >
            <template v-if="song.lyrics.length > 4">
              <button
                v-if="expandedList.includes(index)"
                @click="collapseLyric(index)"
              >
                收起歌词
              </button>
              <button
                v-else
                @click="expandLyric(index)"
              >
                展开歌词
              </button>
            </template>
            
            <button @click="copy(song.lyrics)">
              复制歌词
            </button>
          </div>
          <div
            v-if="showLyric&&expandedList.includes(index)"
            class="operation-wrapper bottom"
          >
            <template v-if="song.lyrics.length > 4">
              <button
                v-if="expandedList.includes(index)"
                @click="collapseLyric(index)"
              >
                收起歌词
              </button>
              <button
                v-else
                @click="expandLyric(index)"
              >
                展开歌词
              </button>
            </template>
            <button @click="copy(song.lyrics)">
              复制歌词
            </button>
          </div>
        </td>
        <td class="duration-column">
          {{ $formatDuration(song.dt) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { markKeywords } from '@/util/methods'
const props = defineProps({
  songList: {
    type: Array,
    required: true,
  },
  keywords: {
    type: String,
    default: "",
  },
  showLyric: {
    type: Boolean,
    default: false,
  }
});

let activeIndex = ref(-1)

const focusOn = index => {
  activeIndex.value = index
}

const getLyrics = (lyrics, index) => {
  if(expandedList.includes(index)){
    return lyrics
  }else {
    return lyrics.slice(0,4)
  }
}

let expandedList = reactive([])
const expandLyric = index => {
  expandedList.push(index)
}
const collapseLyric = index => {
  expandedList.splice(expandedList.indexOf(index), 1)
}

const copy = async lyrics => {
  let list = [...lyrics]
  if(list.length > 0){
    list[0] = list[0].replace('<b>', '').replace('</b>', '')
    await navigator.clipboard.writeText(list.join(' '));
    console.log('复制成功！！');
    // TODO: 弹出提示窗
  }
}


const toArtistDetail = () => {

}
</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
.song-list-table {
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
      .name-column{
        .song-name{
          .more{
            visibility: visible;
          }
        }
      }
    }
    &.active{
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

    .song-name{
      display: flex;
      align-items: center;
      .name{
        color: #333;
        .ellipsis;
      }
      .vip{
        color: #c3473a;
        font-size: 18px;
        margin-left: 5px;
      }
      .sq{
        color: #c3473a;
        font-size: 18px;
        margin-left: 5px;
      }
      .mv{
        color: #c3473a;
        font-size: 18px;
        margin-left: 2px;
        font-weight: bold;
        cursor: pointer;
      }
      .more{
        color: #999;
        margin-left: 5px;
        visibility: hidden;
        cursor: pointer;
        &:hover{
          color: #666;
        }
      }
    }
    .alia{
      .ellipsis;
      color: #999;
      font-size: 12px;
      height: 25px;
      line-height: 20px;
    }
    .song-lyric{
      padding-left: 5px;
      font-size: 12px;
      box-sizing: border-box;
      margin-bottom: 20px;
      span{
        display: block;
        width: 100%;
        &.artist {
          height: 25px;
          line-height: 25px;
          color: #666;
        }
        &.lyric-row{
          height: 20px;
          line-height: 20px;
          color: #999;
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
    .operation-wrapper{
      text-align: right;
      button{
        cursor: default;
        width: 75px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid #bbb;
        font-size: 12px;
        color: #333;
        &:last-child{
          margin-left: 10px;
        }
        &:hover{
          background-color: #eee;
        }
      }
      &.bottom{
        left: 0;
        right: 10px;
        position: absolute;
        bottom: 20px;
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
