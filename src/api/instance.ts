import axios from "axios";
import { getLoginCookie } from "../utils/loginCookie.ts";
import BASE_URL from "../utils/BASE_URL.ts";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getLoginCookie()}`;
  return config;
});
