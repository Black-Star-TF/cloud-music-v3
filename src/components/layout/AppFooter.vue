<template>
  <div class="app-footer">
    <div class="left"></div>
    <div class="center">
      <div class="controls">
        <div class="prev">
          <i class="iconfont icon-prev" />
        </div>
        <div class="play">
          <!-- <i class="iconfont icon-pausing pause" /> -->
          <i class="iconfont icon-playing play" />
        </div>
        <div class="next">
          <i class="iconfont icon-next" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="controls-wrapper">
        <div class="volume-control">
          <i class="iconfont icon-volume" />
          <!-- <i class="iconfont icon-mute" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import {   } from "vue";

</script>

<style lang="less" scoped>
.app-footer {
  height: 60px;
  background-color: var(--app-footer-bg);
  display: flex;
  width: 100%;
  align-items: center;

  .left {
    width: 20px;
    height: 100%;
    width: calc((100% - 300px) / 2);
  }

  .center {
    width: 300px;
    height: 100%;
    margin: 0 auto;

    .controls {
      display: flex;
      width: 130px;
      margin: 0 auto;
      height: 100%;
      justify-content: space-between;
      align-items: center;

      .prev,
      .next {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #c3473a;
      }

      .play {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #c3473a;
        border-radius: 50%;
        color: #fff;

        .pause {
          margin-left: 2px;
        }
      }
    }
  }

  .right {
    width: 200px;
    height: 100%;
    width: calc((100% - 300px) / 2);
    .controls-wrapper {
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
      padding-right: 20px;
    }

    .volume-control {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #333;

      .iconfont {
        font-size: 20px;
      }
    }
  }
}
</style>
