/*
 * @Author: BlackStar
 * @Date: 2022-03-15 13:02:22
 * @LastEditTime: 2022-03-17 14:59:57
 * @FilePath: /cloud-music-v3-ts/src/util/request.ts
 * @Description:
 */
import axios from "axios";

// TODO: typescript对axios的封装
const instance = axios.create({
  baseURL: "/api",
  timeout: 5 * 1000,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    // TODO: 拦截器，添加cookie或token
    return config;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;
