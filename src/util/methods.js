/*
 * @Author: BlackStar
 * @Date: 2022-03-17 17:06:39
 * @LastEditTime: 2022-03-20 00:00:20
 * @FilePath: /cloud-music-v3/src/util/methods.js
 * @Description:
 */

export function formatCount(count) {
  if (Math.floor(count / 10000) > 0) {
    return `${Math.floor(count / 10000)}万`;
  } else {
    return `${count}`;
  }
}

export function formatImgSize(url, width, height) {
  return `${url}?param=${width}y${height}`;
}
