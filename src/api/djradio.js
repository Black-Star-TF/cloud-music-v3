/*
 * @Author: BlackStar
 * @Date: 2022-03-19 15:28:05
 * @LastEditTime: 2022-03-20 20:54:08
 * @FilePath: /cloud-music-v3/src/api/djradio.js
 * @Description: 电台相关接口
 */
import request from "@/util/request";
/**
 * @description: 获取电台banner
 * @return {*}
 */
export const getBanner = () => request.get('/dj/banner')

// 
/**
 * @description: 付费精品电台
 * @param {*} limit  数量
 * @param {*} offset 偏移
 */
export const getPayQualityRadios = ({ limit, offset }) => request.get('/dj/paygift', {
  params: {
    limit,
    offset
  }
})
/**
 * @description: 电台个性推荐
 * @param {*} limit 数量
 */
export const getRecommendRadios = ({limit}) => request.get('/dj/personalize/recommend', {
  params: {
    limit
  }
})
/**
 * @description: 推荐电台分类
 */
export const getRecommendRadioCategories = () => request.get('/dj/category/recommend')

export const getRecommendRadiosOfCategory = ({type}) => request.get('/dj/recommend/type', {
  params: {
    type
  }
})