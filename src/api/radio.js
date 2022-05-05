/*
 * @Author: BlackStar
 * @Date: 2022-03-19 15:28:05
 * @LastEditTime: 2022-04-12 17:31:04
 * @FilePath: /cloud-music-v3/src/api/radio.js
 * @Description: 电台相关接口
 */
import request from "@/util/request";

/**
 * @description: 获取电台banner
 */
const banner = () => request.get('/dj/banner');

/**
 * @description: 付费精品电台
 * @param { limit }  数量
 * @param { offset } 偏移
 */
const paid = params => request.get('/dj/paygift', { params });

/**
 * @description: 电台个性推荐
 * @param { limit } limit 返回数量,默认为6,总条数最多6条
 */
const recommend = params => request.get('/dj/personalize/recommend', { params });

/**
 * @description: 电台推荐分类
 */
const rcmdCategory = () => request.get('/dj/category/recommend');

/**
 * @description: 获取对应类型电台列表
 * @param { type } 电台类型 
 */
const list = params => request.get('/dj/recommend/type', { params });

/**
 * @description: 电台详情
 * @param { rid } 电台id 
 */
const detail = params => request.get('/dj/detail', { params });

export default {
  banner,
  paid,
  recommend,
  rcmdCategory,
  list,
  detail
};
