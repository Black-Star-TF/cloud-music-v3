import request from "@/util/request";

/**
 * @description: 独家放送列表
 * @param { limit } 返回数量 , 默认为 60
 * @return { offset } 偏移数量，用于分页
 */
export const getPrivateContentList = params =>
  request.get("/personalized/privatecontent/list", { params });
