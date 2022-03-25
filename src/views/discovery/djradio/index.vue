<template>
  <div class="djradio-wrapper">
    <div
      v-if="!loading"
      class="page-box"
    >
      <slider-show
        v-if="banners.length > 0"
        :data="banners"
        :options="{ cover: 'pic' }"
      />
      <common-wrapper>
        <template #left>
          <span
            class="section-title link"
            @click="toRadioPay"
          >
            付费精品
          </span>
        </template>
        <template #content>
          <ul class="flex-box wrap">
            <pay-quality-radio-item
              v-for="(radio, index) in payQualityRadioData"
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
              v-for="radio in recommendRadioData.slice(0, column)"
              :key="radio.id"
              :radio="radio"
            />
          </ul>
        </template>
      </common-wrapper>

      <common-wrapper
        v-for="category in radioCategories"
        :key="category.categoryId"
      >
        <template #left>
          <span
            class="section-title link"
            @click="toCategory(category.categoryId)"
          >{{ category.categoryName }}</span>
        </template>
        <template
          v-if="category.radios"
          #content
        >
          <ul class="flex-box">
            <radio-item
              v-for="radio in category.radios.slice(0, column)"
              :key="radio.id"
              :radio="radio"
            />
          </ul>
        </template>
      </common-wrapper>
    </div>
    <common-loading v-else />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  getBanner,
  getPayQualityRadios,
  getRecommendRadios,
  getRecommendRadioCategories,
  getRecommendRadiosOfCategory,
} from "@/api/djradio";
import SliderShow from "@/components/common/SliderShow.vue";
import CommonWrapper from "@/components/common/CommonWrapper.vue";
import PayQualityRadioItem from "@/views/radio-pay/components/PayQualityRadioItem.vue";
import RadioItem from "./components/RadioItem.vue";
import CommonLoading from '@/components/common/CommonLoading'

import {useColumn} from '@/hooks'
let column = useColumn(1060, 6, 5);

// 电台banner
let banners = reactive([]);
const getBannerData = async () => {
  const { data } = await getBanner();
  banners.length = 0;
  banners.push(...data);
};

// 付费精选电台
let payQualityRadioData = reactive([]);
const getPayQualityRadioData = async () => {
  const {
    data: { list },
  } = await getPayQualityRadios({ limit: 4, offset: 0 });
  payQualityRadioData.length = 0;
  payQualityRadioData.push(...list);
};

// 电台个性推荐
let recommendRadioData = reactive([]);
const getRecommendRadioData = async () => {
  const { data } = await getRecommendRadios({ limit: 6 });
  recommendRadioData.push(...data);
};

// 电台分类
let radioCategories = reactive([]);
const getRadioCategoriesData = async () => {
  const { data } = await getRecommendRadioCategories();
  radioCategories.push(
    ...data.slice(0, 6).map(item => ({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
    }))
  );
  let list = await axios.all(
    radioCategories.map(category =>
      getRecommendRadiosOfCategory({ type: category.categoryId })
    )
  );
  for (let i = 0; i < radioCategories.length; i++) {
    radioCategories[i].radios = list[i].djRadios.filter(
      item => item.rcmdText || item.rcmdtext
    );
  }
};

const router = useRouter();
const toRadioPay = () => {
  router.push("/radio/pay");
};

const toCategory = categoryId => {
  console.log(categoryId);
};

let loading = ref(true);
Promise.all([
  getBannerData(),
  getPayQualityRadioData(),
  getRecommendRadioData(),
  getRadioCategoriesData(),
]).then(() => {
  loading.value = false;
});
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
    &.link{
      cursor: pointer;
      &:hover {
        color: #000;
      }
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
