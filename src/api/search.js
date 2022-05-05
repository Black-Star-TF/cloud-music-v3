/*
 * @Author: BlackStar
 * @Date: 2022-03-26 13:27:03
 * @LastEditTime: 2022-04-02 16:02:44
 * @FilePath: /cloud-music-v3/src/api/search.js
 * @Description: 搜索相关接口
 */
import request from "@/util/request";

/**
 * @description: 获取搜索建议
 * @param { keywords} 关键词
 */
export const suggestion = params => request.get('/search/suggest', { params });

/**
 * @description: 热搜列表
 */
export const hotContent = () => request.get('/search/hot/detail');

/**
 * @description: 搜索接口
 * @param { keywords } 搜索关键词
 * @param { type } 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @param { limit } 返回数量 , 默认为 30
 * @param { offset } 偏移数量，用于分页
 */
export const list = params => request.get('/cloudsearch', { params });

export default {
  suggestion,
  hotContent,
  list,
};