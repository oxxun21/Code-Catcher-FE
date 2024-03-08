import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "../interface";

export const useUserStore = create(
  persist<UserState>(
    set => ({
      userId: null,
      nickname: null,
      setUserInfo: ({ userId, nickname }) => {
        set(state => ({
          // 선택적으로 userId와 nickname을 업데이트. 값이 제공되지 않으면 기존 값 유지
          userId: userId !== undefined ? userId : state.userId,
          nickname: nickname !== undefined ? nickname : state.nickname,
        }));
      },
      clearUserInfo: () => set({ userId: null, nickname: null }),
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  )
);
