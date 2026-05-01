import axios from "axios";

// 生产环境：前后端部署在同一Tomcat，使用相对路径
// 开发环境：走 vue.config.js 代理
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/ssm-backend/user" : "/user";

export const userLogin = (payload) =>
  axios.post(`${BASE_URL}/login`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
export const userRegister = (payload) =>
  axios.post(`${BASE_URL}/register`, payload);
