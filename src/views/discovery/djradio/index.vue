<template>
  <div class="djradio-wrapper">
    <div
      v-if="!loading"
      class="page-box"
    >
      <slider-show
        :data="banners"
        :options="{ cover: 'pic' }"
      />
      <common-wrapper>
        <template #left>
          <span
            class="section-title link"
            @click="toPaid"
          > 付费精品<i class="iconfont icon-back" /></span>
        </template>
        <template #content>
          <ul class="flex-box wrap">
            <pay-quality-radio-item
              v-for="(radio, index) in paidRadios"
              :key="radio.id"
              class="pay-radio"
              :radio="radio"
              :index="index + 1"
            />
          </ul>
        </template>
      </common-wrapper>
      <common-wrapper>
        <template #left>
          <span class="section-title">电台个性推荐</span>
        </template>
        <template #content>
          <ul class="flex-box">
            <radio-item
              v-for="(radio, index) in rcmdRadios.slice(0, column)"
              :key="radio.id"
              :radio="radio"
              :index="index + 1"
              :column="column"
            />
          </ul>
        </template>
      </common-wrapper>

      <common-wrapper
        v-for="category in list"
        :key="category.id"
      >
        <template #left>
          <span
            class="section-title link"
            @click="toCategory(category.id)"
          >{{ category.name}}<i class="iconfont icon-back" /></span>
        </template>
        <template
          v-if="category.options"
          #content
        >
          <ul class="flex-box">
            <radio-item
              v-for="(radio, index) in category.options.slice(0, column)"
              :key="radio.id"
              :radio="radio"
              :index="index + 1"
              :column="column"
            />
          </ul>
        </template>
      </common-wrapper>
    </div>
    <common-loading v-else />
  </div>
</template>

<script setup>
  import SliderShow from '@/components/common/SliderShow.vue';
  import PayQualityRadioItem from '@/views/radio-pay/components/PayQualityRadioItem.vue';
  import RadioItem from './components/RadioItem.vue';
  import useDate from './index';
  const { 
    loading,
    banners,
    paidRadios,
    rcmdRadios,
    list,
    column, 
    toPaid,
    toCategory,
  } = useDate();
</script>

<style lang="less" scoped>
  .djradio-wrapper {
    height: 100%;
    overflow: overlay;
    .section-title {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      &.link {
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .iconfont {
        font-size: 20px;
        display: inline-block;
        transform: rotate(180deg);
        vertical-align: -1.5px;
      }
    }
    .flex-box {
      display: flex;
      &.wrap {
        flex-wrap: wrap;
      }
      .pay-radio {
        border-top: 1px solid #f2f2f2;
        &:nth-child(3),
        &:nth-child(4) {
          border-bottom: 1px solid #f2f2f2;
          margin-bottom: 40px;
        }
      }
    }
  }
</style>
