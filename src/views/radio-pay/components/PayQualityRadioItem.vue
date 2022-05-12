
<template>
  <li
    class="pay-quality-radio-item-box"
    :style="style"
    @click="toRadioDetail(radio.id)"
  >
    <div class="cover-box">
      <img v-lazy="$formatImgSize(radio.picUrl,1000,1000)">
      <div class="tag">
        付费精品
      </div>
    </div>
    <div class="info-box">
      <div class="name ellipsis1">
        {{ radio.name }}
      </div>
      <div class="desc ellipsis1">
        {{ radio.rcmdText }}
      </div>
      <div class="last-program ellipsis1">
        <span class="iconfont icon-pause pause" />{{ radio.lastProgramName }}
      </div>
      <div class="price">
        ¥ {{ getPrice() }}
      </div>
    </div>
  </li>
</template>

<script setup>
import { useFlexStyle } from '@/hooks/index';
import { toRadioDetail } from '@/util/methods';
const props = defineProps({
  radio: {
    type: Object,
    required: true,
  },
  column: {
    type: Number,
    default: 2,
  },
  index: {
    type: Number,
    required: true,
  },
  marginRight: {
    type: Number,
    default: 40,
  },
});
let style = useFlexStyle(props);
const getPrice = () => (props.radio.originalPrice/100).toFixed(1);
</script>

<style lang="less" scoped>
.pay-quality-radio-item-box{
  height: 156px;
  display: flex;
  align-items: center;
  .cover-box{
    width: 135px;
    height: 135px;
    position: relative;
    margin-right: 10px;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    img{
      width: 100%;
      height: 100%;
    }
    .tag{
      width: 60px;
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      border-bottom-right-radius: 5px;
      background-color: #c3473a;
      color: #ffffff;
    }
  }
  .info-box{
    min-width: 0;
    flex: 1;
    height: 135px;
    .name{
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin: 15px 0;
      cursor: pointer;
      &:hover{
        color: #000;
      }
    }
    .desc{
      font-size: 12px;
      color: #bbb;
      margin: 5px 0;
    }
    .last-program{
      font-size: 12px;
      color: #bbb;
      margin: 5px 0;
      .pause{
        font-size: 12px;
        position: relative;
        margin-right: 3px;
        font-weight: bold;
      }
    }
    .price{
      font-weight: 500;
      font-size: 15px;
      color: #c3473a;
      margin-top: 15px;
    }
  }
}
</style>
