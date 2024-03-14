import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setLoginCookie = (value: string, options?: any) => {
  return cookie.set("LOGIN_COOKIE", value, { ...options });
};

export const getLoginCookie = () => {
  return cookie.get("LOGIN_COOKIE");
};

export const removeLoginCookie = (options?: any) => {
  return cookie.remove("LOGIN_COOKIE", { ...options });
};
