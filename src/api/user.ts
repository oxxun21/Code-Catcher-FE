import { instance } from "./instance.ts";
import { UserState } from "../interface";

export const getUserAPI = async (setUserInfo: UserState["setUserInfo"]) => {
  try {
    const response = await instance.get(`user/info`);
    const resData = response.data;
    if (resData) {
      const { ...userInfo } = resData;
      setUserInfo(userInfo);
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("유저 정보 불러오기 실패", error);
    throw error;
  }
};
