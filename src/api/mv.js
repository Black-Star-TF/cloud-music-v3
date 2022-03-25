import request from "@/util/request";

/**
 * @description: 最新MV
 * @param {area}  地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {limit}  数量
 */
export const getNewestMV = params => request.get('/mv/first', { params })

/**
 * @description: 全部MV
 * @param {area}  地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {type}  类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {order}  排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {limit}  取出数量 , 默认为 30
 * @param {offset}  偏移数量 , 用于分页
 */
export const getTotalMV = params => request.get('/mv/all', { params })


/**
 * @description: 网易出品MV
 * @param {limit}  取出数量 , 默认为 30
 * @param {offset}  偏移数量 , 用于分页
 */
export const getExclusiveMV = params => request.get('/mv/exclusive/rcmd', { params })

/**
 * @description: MV排行
 * @param {area}  地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 * @param {limit}  取出数量 , 默认为 30
 * @param {offset}  偏移数量 , 用于分页
 */
export const getMVTopList = params => request.get('/top/mv', {params})