/*
 * @Author: BlackStar
 * @Date: 2022-03-16 19:18:05
 * @LastEditTime: 2022-03-19 19:54:33
 * @FilePath: /cloud-music-v3/src/api/playlist.js
 * @Description: 歌单相关接口
 */

import request from "@/util/request";

/**
 * @description: 歌单分类
 * @return {*}
 */
export function getPlaylistCategory() {
  return request.get("/playlist/catlist");
}


/**
 * @description: 热门歌单分类
 * @return {*}
 */
export function getHotPlaylistCategory() {
  return request.get("/playlist/hot");
}
// /top/playlist?order=hot&cat=全部歌单&limit=10&offset=0
export function getPlaylists(
  cat,
  limit,
  offset,
  order = "hot"
) {
  return request.get("/top/playlist", {
    params: {
      cat,
      limit,
      offset,
      order,
    },
  });
}

// 精品歌单分类
