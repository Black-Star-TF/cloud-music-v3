/*
 * @Author: BlackStar
 * @Date: 2022-03-22 12:44:47
 * @LastEditTime: 2022-05-11 18:05:07
 * @FilePath: /cloud-music-v3/src/api/album.js
 * @Description: 
 */
import request from "@/util/request";

const newest = params => request.get('/top/album', { params });

/**
 * @description: 专辑详情
 * @param { id } 专辑id
 */
const detail = params => request.get('/album', { params });

/**
 * @description: 专辑评论
 * @param { id } 专辑id
 * @param { limit } 数量
 * @param { offset } 偏移量
 */
const comments = params => request.get('/comment/album', { params });

/**
 * @description: 专辑动态信息
 * @param { id } 专辑id
 */
const dynamicDetail = params => request.get('/album/detail/dynamic', { params });

export default {
  newest,
  detail,
  dynamicDetail,
  comments,
};