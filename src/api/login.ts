import { NavigateFunction } from "react-router-dom";
import { instance } from "./instance";
import { UserState } from "../interface";
import { setLoginCookie } from "../utils/loginCookie";

export const getUserAPI = async (code: string, navigate: NavigateFunction, setUserInfo: UserState["setUserInfo"]) => {
  try {
    const response = await instance.get(`kakao/callback?code=${code}`);
    if (response.data) {
      const resData = response.data;
      console.log(resData);
      const { jwt, userId, nickname } = response.data;
      setLoginCookie(jwt, { path: "/" });
      setUserInfo(userId, nickname);
      navigate("/");
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("로그인 오류 발생", error);
    throw error;
  }
};
