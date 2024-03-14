import { instance } from "./instance";
import { UserState } from "../interface";

export const updateNicknameAPI = async (setUserInfo: UserState["setUserInfo"], newNickname: string) => {
  try {
    const response = await instance.patch(`/user/nickname`, { nickname: newNickname });
    if (response.data) {
      const resData = response.data;
      console.log(resData);
      const { nickname } = response.data;
      setUserInfo({ nickname });
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("닉네임 변경 오류", error);
    throw error;
  }
};
