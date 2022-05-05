<template>
  <header-detail :options="options">
    <div class="create-info">
      <img
        :src="$formatImgSize(radio.dj.avatarUrl, 50,50)"
        class="creator-avatar"
      >
      <span class="creator-name">{{ radio.dj.nickname }}</span>
    </div>
    <operation-box type="radio"/>
    <div class="desc">
      <span class="tag">{{ radio.category }}</span>
      <span>{{ radio.desc }}</span>
    </div>
  </header-detail>
</template>

<script setup>
import { computed } from "vue";
import HeaderDetail from "@/components/header-detail/HeaderDetail";
import OperationBox from "@/components/operation-box/OperationBox";
const props = defineProps({
  radio: {
    type: Object,
    required: true,
  }
});

const options = computed(() => {
  return {
    cover: props.radio.picUrl,
    name: props.radio.name,
    type: 'radio'
  };
});
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
.desc{
  font-size: 12.5px;
  color: #333;
  margin-top: 20px;
  .tag{
    padding: 0 2px;
    border-radius: 2px;
    transform: translateX(-2px) scale(.9);
    display: inline-block;
    color: #c3473a;
    border: 1px solid #db9089;
  }
}
</style>
