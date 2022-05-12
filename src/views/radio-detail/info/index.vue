<template>
  <div class="info-tab">
    <div class="section">
      <h3 class="title">
        {{radio.feeInfo.modules[0].data.title}}
      </h3>
      <p class="content">
        {{radio.feeInfo.modules[0].data.detail[0].content}}
      </p>
    </div>
    <div class="section">
      <h3 class="title">
        最近更新
      </h3>
      <program-item
        v-for="program in radio.feeInfo.modules[1].data"
        :key="program.id"
        :program="program"
      />
    </div>
    <div class="section">
      <h3 class="title">
        免费试听
      </h3>
      <program-item
        v-for="program in radio.feeInfo.modules[2].data"
        :key="program.id"
        :program="program"
      />
    </div>

    <div class="section">
      <h3 class="title">
        {{radio.feeInfo.modules[3].data.title}}
      </h3>
      <p class="content">
        {{radio.feeInfo.modules[3].data.detail[0].content}}
      </p>
    </div>
  </div>
</template>

<script setup>
import ProgramItem from '../components/ProgramItem.vue';
const props = defineProps({
  radio: {
    type: Object,
    required: true,
  }
});
</script>

<style lang="less" scoped>
.info-tab {
  padding-bottom: 30px;
  .section {
    &:not(:first-of-type){
      margin-top: 40px;
    }
    .title {
      margin-left: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      color: #333;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .content {
      margin-left: 30px;
      font-size: 12px;
      line-height: 25px;
      color: #999;
      white-space: pre-line;
    }
  }
}
</style>
