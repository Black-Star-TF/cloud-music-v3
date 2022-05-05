/*
 * @Author: BlackStar
 * @Date: 2022-03-22 12:44:47
 * @LastEditTime: 2022-04-12 16:19:18
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
 * @description: 
 * @param { id } 专辑id
 * @param { limit } 数量
 * @param { offset } 偏移量
 */
const comments = params => request.get('/comment/album', { params });

export default {
  newest,
  detail,
  comments,
};