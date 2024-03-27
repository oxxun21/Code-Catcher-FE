import { NavigateFunction } from "react-router-dom";
import { instance } from "./instance.ts";
import { UserState } from "../interface";
import { setLoginCookie } from "../utils/loginCookie.ts";

export const getLoginAPI = async (code: string, navigate: NavigateFunction, setUserInfo: UserState["setUserInfo"]) => {
  try {
    const response = await instance.get(`kakao/callback?code=${code}`);
    const resData = response.data;
    if (resData) {
      console.log(resData);
      const { jwt, ...userInfo } = resData;
      setLoginCookie(jwt, { path: "/" });
      setUserInfo(userInfo);

      navigate("/");
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("로그인 오류 발생", error);
    throw error;
  }
};
