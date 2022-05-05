/*
 * @Author: BlackStar
 * @Date: 2022-03-19 19:56:03
 * @LastEditTime: 2022-05-05 11:05:30
 * @FilePath: /cloud-music-v3/src/common/config/sub-nav-disc.js
 * @Description: 
 */
import { INavItem } from "./aside-nav-list";

const subNavDisc = {
  "/discovery": [
    {
      name: "个性推荐",
      path: "/recommend",
    },
    {
      name: "歌单",
      path: "/playlist",
    },
    {
      name: "主播电台",
      path: "/radio",
    },
    {
      name: "排行榜",
      path: "/toplist",
    },
    {
      name: "歌手",
      path: "/artist",
    },
    {
      name: "最新音乐",
      path: "/newest",
    },
  ],
  "/v": [
    {
      name: "视频",
      path: "/video",
    },
    {
      name: "MV",
      path: "/mv",
    },
  ],
  '/my/download': [
    {
      name: "已下载单曲",
      path: "single",
    },
    {
      name: "已下载节目",
      path: "program",
    },
    {
      name: "正在下载",
      path: "downloading",
    },
  ],
  "/my/favorite": [
    {
      name: "专辑",
      path: "album",
    },
    {
      name: "歌手",
      path: "artist",
    },
    {
      name: "视频",
      path: "video",
    },
    {
      name: "专栏",
      path: "topic",
    },
  ]
};

export default subNavDisc;
