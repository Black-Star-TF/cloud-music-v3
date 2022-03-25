/*
 * @Author: BlackStar
 * @Date: 2022-03-21 15:05:25
 * @LastEditTime: 2022-03-21 15:22:10
 * @FilePath: /cloud-music-v3/src/api/artist.js
 * @Description: 歌手相关接口
 */
import request from "@/util/request";

/**
 * @description: 
 * @param {*} area 地区
 * @param {*} type 类型
 * @param {*} initial 首字母
 * @param {*} limit 数量
 * @param {*} offset 偏移
 * @return {*}
 */
export const getArtistList = params => request.get("/artist/list", { params });
