/*
 * @Author: BlackStar
 * @Date: 2022-03-16 21:55:22
 * @LastEditTime: 2022-04-02 16:03:37
 * @FilePath: /cloud-music-v3/src/api/recommend.js
 * @Description: 推荐页相关接口
 */

import request from "@/util/request";

/**
 * @description: 推荐页banner列表
 * @param { type }  资源类型,默认为0:  0:pc; 1:android; 2:iphone; 3:ipad
 */
export const banner = params => request.get("/banner", { params });

/**
 * @description: 推荐歌单
 * @param { limit }  返回列表长度
 */
export const playlist = params => request.get("/personalized", { params });

/**
 * @description: 推荐新音乐
 * @param { limit } 数量
 */
export const song = params => request.get("/personalized/newsong", { params });

/**
 * @description: 推荐页独家放送
 */
export const privateContent = () => request.get("/personalized/privatecontent");

/**
 * @description: 推荐MV
 */
export const mv = () => request.get("/personalized/mv");


export default {
  banner,
  playlist,
  song,
  privateContent,
  mv
};