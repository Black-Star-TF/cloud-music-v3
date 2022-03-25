/*
 * @Author: BlackStar
 * @Date: 2022-03-17 17:06:39
 * @LastEditTime: 2022-03-21 21:59:40
 * @FilePath: /cloud-music-v3/src/util/methods.js
 * @Description:
 */

export const formatCount = count => {
  if (Math.floor(count / 10000) > 0) {
    return `${Math.floor(count / 10000)}万`;
  } else {
    return `${count}`;
  }
}

export const formatImgSize = (url, width, height) => {
  return `${url}?param=${width}y${height}`;
}
export const formatDuration = duration => {
  let seconds = Math.round(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return `${minutes}:${seconds}`;
}