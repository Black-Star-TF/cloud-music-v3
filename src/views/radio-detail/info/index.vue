<template>
  <div class="info-tab">
    <div
      v-for="(section, index) in radio.feeInfo.modules"
      :key="index"
      class="section"
    >
      <template v-if="[3, 8].includes(section.type)">
        <h3 class="title ml30">
          {{section.data.title}}
        </h3>
        <template
          v-for="(de, di) in section.data.detail"
          :key="di"
        >
          <p
            v-if="de.type === 1"
            class="content ml30"
          >
            {{de.content}}
          </p>
          <img
            v-if="de.type === 3"
            :src="de.content"
            class="image ml30"
          >
        </template>
        
      </template>
      <template v-if="[4, 5].includes(section.type)">
        <h3 class="title ml30">
          {{section.type === 5 ? '免费试听' : '最近更新' }}
        </h3>
        <program-item
          v-for="program in section.data"
          :key="program.id"
          :program="program"
        />
      </template>
      <!-- TODO: 评论 -->
    </div>
  </div>
</template>

<script setup>
import ProgramItem from '../components/ProgramItem.vue';
defineProps({
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
    .ml30 {
      margin-left: 30px;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      color: #333;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .content {
      font-size: 12px;
      line-height: 25px;
      color: #999;
      white-space: pre-line;
    }
    .image {
      width: 336px;
      height: 100%;
      display: block;
    }
  }
}
</style>
