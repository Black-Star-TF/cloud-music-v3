/*
 * @Author: BlackStar
 * @Date: 2022-03-16 19:18:05
 * @LastEditTime: 2022-03-20 22:31:41
 * @FilePath: /cloud-music-v3/src/api/playlist.js
 * @Description: 歌单相关接口
 */

import request from "@/util/request";

/**
 * @description: 歌单分类
 */
export function getPlaylistCategory() {
  return request.get("/playlist/catlist");
}

/**
 * @description: 热门歌单分类
 */
export function getHotPlaylistCategory() {
  return request.get("/playlist/hot");
}

/**
 * @description: 获取歌单列表
 * @param {*} cat  歌单分类
 * @param {*} limit  数量
 * @param {*} offset 偏移量
 * @param {*} order  排序
 */
export function getPlaylists({ cat, limit, offset, order = "hot" }) {
  return request.get("/top/playlist", {
    params: {
      cat,
      limit,
      offset,
      order,
    },
  });
}

/**
 * @description: 精品歌单分类
 */
export function getHighQualityPlaylistCategory() {
  return request.get('/playlist/highquality/tags')
}

/**
 * @description: 
 * @param {*} cat  分类
 * @param {*} limit 数量
 * @param {*} before 前一次请求时间戳
 */
export function getHighQualityPlaylists({ cat, limit, before = null }) {
  return request.get('/top/playlist/highquality', {
    params: {
      cat,
      limit,
      before
    }
  })
}


export const getPlaylistSongs = ({id}) => request.get('/playlist/track/all', {
  params: {
    id
  }
})
