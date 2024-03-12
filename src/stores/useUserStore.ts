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
      setUserInfo: ({ userId, nickname, email, level }) => {
        set(state => ({
          // 선택적으로 userId와 nickname을 업데이트. 값이 제공되지 않으면 기존 값 유지
          userId: userId !== undefined ? userId : state.userId,
          nickname: nickname !== undefined ? nickname : state.nickname,
          email: email !== undefined ? email : state.email,
          level: level !== undefined ? level : state.level,
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
