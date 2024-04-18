import { NavigateFunction } from "react-router-dom";
import { instance } from "./instance.ts";
import { UserState } from "../interface";
import { setLoginCookie } from "../utils/loginCookie.ts";
import { useEventTracker } from "../hook/useEventTracker.tsx";

export const getLoginAPI = async (code: string, navigate: NavigateFunction, setUserInfo: UserState["setUserInfo"]) => {
  const trackEvent = useEventTracker();

  try {
    const response = await instance.get(`kakao/callback?code=${code}`);
    const resData = response.data;
    if (resData) {
      const { jwt, isNew, ...userInfo } = resData;

      setLoginCookie(jwt, { path: "/" });
      setUserInfo(userInfo);

      navigate("/");
      if (isNew) {
        trackEvent({
          category: "Auth",
          action: "signup success",
          label: "Kakao",
        });
      } else {
        trackEvent({
          category: "Auth",
          action: "login success",
          label: "kakao",
        });
      }
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("로그인 오류 발생", error);
    throw error;
  }
};
