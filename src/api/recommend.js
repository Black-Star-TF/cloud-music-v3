/*
 * @Author: BlackStar
 * @Date: 2022-03-16 21:55:22
 * @LastEditTime: 2022-03-19 19:55:18
 * @FilePath: /cloud-music-v3/src/api/recommend.js
 * @Description: 推荐页相关接口
 */

import request from "@/util/request";

/**
 * @description: 推荐页banner列表
 * @param {string} type banner类型
 * @return {*}
 */
export function getRecommendBanner(type) {
  return request.get("/banner", {
    params: {
      type,
    },
  });
}

/**
 * @description: 推荐歌单
 * @param {number} limit 返回列表长度
 * @return {*}
 */
export function getRecommendPlaylist(limit = 10) {
  return request.get("/personalized", {
    params: {
      limit,
    },
  });
}

/**
 * @description: 推荐新音乐
 * @param {number} limit
 * @return {*}
 */
export function getRecommendSongs(limit) {
  return request.get("/personalized/newsong", {
    params: {
      limit,
    },
  });
}

/**
 * @description: 推荐页独家放送
 * @return {*}
 */
export function getRecommendPrivateContents() {
  return request.get("/personalized/privatecontent");
}

/**
 * @description: 推荐NV
 * @return {*}
 */
export function getRecommendMVs() {
  return request.get("/personalized/mv");
}
