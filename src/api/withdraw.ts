import { instance } from "./instance.ts";

export const withdrawAPI = async () => {
  try {
    const response = await instance.delete(`/user/withdraw`);
    if (response.status === 200) {
      return response.status;
    } else {
      console.error("회원 탈퇴 처리 중 오류가 발생했습니다.", response);
    }
  } catch (error) {
    throw error;
  }
};
