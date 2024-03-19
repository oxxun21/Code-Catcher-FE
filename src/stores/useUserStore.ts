import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "../interface";

export const useUserStore = create(
  persist<UserState>(
    set => ({
      userId: null,
      nickname: null,
      email: null,
      level: null,
      exp: null,
      expUpper: null,
      totalCnt: null,
      completeCnt: null,
      bookmarkCnt: null,
      setUserInfo: userInfo => {
        set(state => ({
          ...state,
          ...userInfo,
        }));
      },
      clearUserInfo: () =>
        set({
          userId: null,
          nickname: null,
          email: null,
          level: null,
          exp: null,
          expUpper: null,
          totalCnt: null,
          completeCnt: null,
          bookmarkCnt: null,
        }),
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  )
);
