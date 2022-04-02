<template>
  <li class="radio-item-box">
    <div class="cover-box">
      <div class="mask" />
      <img
        v-lazy="
          $formatImgSize(radio.picUrl, 1000, 1000)
        "
      >
      <div class="dj">
        {{ radio.name }}
      </div>
    </div>
    <div class="name-box">
      <span class="name">{{ radio.rcmdText ?? radio.rcmdtext }}</span>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  radio: {
    type: Object,
    required: true,
  }
})

</script>

<style lang="less" scoped>
@import url("~@/style/common-mixins.less");
@import url("~@/style/item-mixins.less");
.radio-item-box {
  margin-bottom: 40px;
  box-sizing: border-box;
  margin-right: 20px;
  flex: 1;
  &:last-child{
    margin-right: 0;
  }
  .box-style(100%);
  .name-box {
    .ellipsis_rows(2);
  }
  .cover-box{
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 80%,
        rgba(0, 0, 0, .6)
      );
    }
    .dj{
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      z-index: 2;
      padding-left: 5px;
      .ellipsis;
    }
  }
  .name-box{
    .name{
      font-size: 13px;
    }
  }
}
</style>
