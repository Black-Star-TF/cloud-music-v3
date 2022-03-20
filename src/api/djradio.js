/*
 * @Author: BlackStar
 * @Date: 2022-03-19 15:28:05
 * @LastEditTime: 2022-03-19 15:30:38
 * @FilePath: /cloud-music-v3-ts/src/api/djradio.ts
 * @Description: 电台相关接口
 */
import request from "@/util/request";
/**
 * @description: 获取电台banner
 * @return {*}
 */
export function getBanner(){
  return request.get('/dj/banner')
}