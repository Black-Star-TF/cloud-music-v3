/*
 * @Author: BlackStar
 * @Date: 2022-03-17 17:06:39
 * @LastEditTime: 2022-03-27 16:07:58
 * @FilePath: /cloud-music-v3/src/util/methods.js
 * @Description:
 */

import router from "@/router";

export const formatCount = count => {
  if (Math.floor(count / 10000) > 0) {
    return `${Math.floor(count / 10000)}万`;
  } else {
    return `${count}`;
  }
};

export const formatImgSize = (url, width, height) => {
  return `${url}?param=${width}y${height}`;
};

// 格式化时长
export const formatDuration = duration => {
  let seconds = Math.round(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return `${minutes}:${seconds}`;
};

// 标记关键词
export const markKeywords = (str, keywords) => {
  return str.replace(keywords, `<span class="keywords">${keywords}</span>`);
};

export const toPlaylistDetail = id => {
  router.push({
    path: "/playlist/detail",
    query: { id },
  });
};
