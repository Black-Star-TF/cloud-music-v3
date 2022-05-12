/*
 * @Author: BlackStar
 * @Date: 2022-03-16 19:18:05
 * @LastEditTime: 2022-05-11 18:37:57
 * @FilePath: /cloud-music-v3/src/api/playlist.js
 * @Description: 歌单相关接口
 */

import request from "@/util/request";

/**
 * @description: 歌单排行榜
 */
export const topList = () => request.get('/toplist');

/**
 * @description: 歌单分类
 */
export const category = () => request.get("/playlist/catlist");


/**
 * @description: 热门歌单分类
 */
export const hotCategory = () => request.get("/playlist/hot");

/**
 * @description: 歌单列表
 * @param { cat }    歌单分类
 * @param { limit }  数量
 * @param { offset } 偏移量
 * @param { order }  排序
 */
export const list = params =>  request.get("/top/playlist", { params });

/**
 * @description: 精品歌单分类
 */
export const  hqCategory = () => request.get('/playlist/highquality/tags');

/**
 * @description: 
 * @param { cat }    歌单分类
 * @param { limit }  数量
 * @param { before } 前一次请求时间戳
 */
export const hqList = params => request.get('/top/playlist/highquality', { params });

/**
 * @description: 歌单所有歌曲
 * @param { id } 歌单id
 */
export const songList = params => request.get('/playlist/track/all', { params });


/**
 * @description: 歌单详情
 * @param { id } 歌单id
 */
export const detail = params => request.get('/playlist/detail', { params });

/**
 * @description: 歌单动态详情
 * @param { id } 歌单id
 */
export const dynamicDetail = params => request.get('/playlist/detail/dynamic', { params });

/**
 * @description: 歌单评论
 * @param { id } 歌单id
 * @param { limit } 数量
 * @param { offset } 偏移数量 , 用于分页
 */
export const comments = params => request.get('/comment/playlist', { params });


/**
 * @description: 歌单收藏者列表
 * @param { id } 歌单id
 * @param { limit } 数量
 * @param { offset } 偏移数量
 */
export const subscribers = params => request.get('/playlist/subscribers', { params });

export default {
  topList,
  category,
  hotCategory,
  list,
  hqCategory,
  hqList,
  songList,
  detail,
  dynamicDetail,
  comments,
  subscribers
};