/*
 * @Author: BlackStar
 * @Date: 2022-03-21 22:08:36
 * @LastEditTime: 2022-04-02 16:06:52
 * @FilePath: /cloud-music-v3/src/api/song.js
 * @Description: 歌曲相关接口
 */
import request from "@/util/request";

/**
 * @description: 新歌速递
 * @param { type } 地区类型: 0:全部; 7:华语; 96:欧美; 8:日本; 16:韩国;
 */
export const newest = params => request.get('/top/song', { params });

export default {
  newest,
};