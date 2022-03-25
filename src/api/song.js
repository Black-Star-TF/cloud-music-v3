/*
 * @Author: BlackStar
 * @Date: 2022-03-21 22:08:36
 * @LastEditTime: 2022-03-21 22:08:36
 * @FilePath: /cloud-music-v3/src/api/song.js
 * @Description: 歌曲相关接口
 */
import request from "@/util/request";

export const getNewSong = params => request.get('/top/song', { params });