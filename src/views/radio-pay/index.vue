<template>
  <div class="radio-pay-wrapper">
    <ul class="flex-box">
      <pay-quality-radio-item
        v-for="(radio,index) in radioData"
        :key="radio.id"
        class="pay-radio"
        :radio="radio"
        :index="index+1"
      />
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getPayQualityRadios } from "@/api/djradio";
import PayQualityRadioItem from './components/PayQualityRadioItem.vue'

const radioData = reactive([])
const hasMore = ref(true)
const getPayQualityRadioData = async () => {
  const {data} = await getPayQualityRadios({limit:30,offset:0})
  hasMore.value = data.hasMore
  radioData.push(...data.list)
}
// TODO: 鼠标滚到底部加载更多
getPayQualityRadioData()
</script>

<style lang="less" scoped>
.radio-pay-wrapper{
  height: 100%;
  overflow: overlay;
  box-sizing: border-box;
  padding: 10px 30px;
  .flex-box{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
