/*
 * @Author: BlackStar
 * @Date: 2022-03-22 12:44:47
 * @LastEditTime: 2022-03-22 12:52:41
 * @FilePath: /cloud-music-v3/src/api/album.js
 * @Description: 
 */
import request from "@/util/request";

export const getNewAlbum = params => request.get('/top/album', { params })