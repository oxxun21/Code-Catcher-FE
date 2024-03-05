import { create } from "zustand";
import { UserState } from "../interface";

export const useUserStore = create<UserState>(set => ({
  userId: null,
  nickname: null,
  setUserInfo: (userId, nickname) => set({ userId, nickname }),
  clearUserInfo: () => set({ userId: null, nickname: null }),
}));
