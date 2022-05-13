<template>
  <header-detail :options="options">
    <div
      v-if="isFree"
      class="create-info"
    >
      <img
        :src="$formatImgSize(radio.dj.avatarUrl, 50,50)"
        class="creator-avatar"
      >
      <span class="creator-name">{{ radio.dj.nickname }}</span>
    </div>
    <div
      v-else
      class="price-box"
    >
      <span class="price">¥ {{ price }}</span>
      <span
        v-if="radio.radioFeeType === 1"
        class="label"
      >/期</span>
    </div>
    <operation-box
      :layout="layout"
      :option="operationOption"
    />
    <div
      v-if="isFree"
      class="desc"
    >
      <div class="content">
        <div class="line ellipsis1">
          <span class="tag">{{ radio.category }}</span>
          <span class="line">{{ desc[0] }}</span>
        </div>
        <div
          v-if="desc.length > 1"
          class="more"
          :class="{'ellipsis1' : !showMore}"
        >
          {{ moreDesc }}
        </div>
      </div>
      <span
        v-if="desc.length > 1"
        class="collapse"
        @click="toggle"
      >
        <i
          v-if="showMore"
          class="iconfont icon-shang"
        ></i>
        <i
          v-else
          class="iconfont icon-xia"
        ></i>
      </span>
    </div>
    <div
      v-else
      class="rcmd"
    >
      {{radio.rcmdText}}
    </div>
    <!-- <div class="type">
      最新上架
    </div> -->
  </header-detail>
</template>

<script setup>
import { computed, ref } from "vue";
import HeaderDetail from "@/components/header-detail/HeaderDetail";
import OperationBox from "@/components/operation-box/OperationBox";
const props = defineProps({
  radio: {
    type: Object,
    required: true,
  }
});

const desc = computed(() => {
  return props.radio.desc.trim().split('\n').filter(item => !!item);
});
const showMore = ref(false);

const moreDesc = computed(() => {
  if(showMore.value){
    return desc.value.slice(1).join('\n');
  }else {
    return desc.value[1];
  }
});

const toggle = () => {
  showMore.value= !showMore.value;
};
const isFree = computed(() => {
  return props.radio.radioFeeType === 0;
});

const options = computed(() => {
  return {
    cover: props.radio.picUrl,
    name: props.radio.name,
    type: isFree.value ? 'radio' : 'fee-radio'
  };
});
const operationOption = computed(() => {
  return {
    shareCount: props.radio.shareCount || 0,
    subscribedCount: props.radio.subCount || 0,
  };
});

const layout = computed(() => {
  if(isFree.value){
    return 'play,subscribe,share';
  }else {
    return 'buy,probation,share';
  }
});

const price = computed(() => ((props.radio?.feeInfo?.price || 0)/100).toFixed(1));
</script>

<style lang="less" scoped>
.create-info{
  height: 30px;
  line-height: 30px;
  font-size: 12.5px;
  margin: 10px 0;
  .creator-avatar{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
  }
  .creator-name{
    vertical-align: middle;
    color: #5a7cab;
    cursor: pointer;
    &:hover{
      color: #2757aa;
    }
  }
}
.price-box {
  height: 20px;
  line-height: 20px;
  margin-top: 20px;
  .price {
    font-weight: 500;
    font-size: 18px;
    color: #c3473a;
    margin-right: 5px;
  }
  .label {
    color: #b2b2b2;
    font-size: 12px;
  }
}
.desc{
  font-size: 12.5px;
  color: #333;
  margin-top: 20px;
  position: relative;
  .content {
    width: calc(100% - 20px);
    white-space: pre-wrap;
    .line {
      line-height: 25px;
      .tag{
        padding: 0 2px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        transform: translateX(-2px) scale(.9);
        display: inline-block;
        color: #c3473a;
        border: 1px solid #db9089;
      }
    }

    .more {
      margin-top: 20px;
      line-height: 25px;
    }
  }
  
  .collapse {
    width: 10px;
    height: 10px;
    line-height: 10px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 0;
    vertical-align: bottom;
    color: #999;
  }
}

.rcmd {
  font-size: 12.5px;
  color: #333;
  height: 20px;
  line-height: 20px;
  padding: 10px 0;
}

.type {
  font-size: 12px;
  color: #b2b2b2;
}
</style>
