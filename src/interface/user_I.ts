export interface UserState {
  userId: string | null;
  nickname: string | null;
  setUserInfo: (userInfo: { userId?: string | null; nickname?: string | null }) => void;
  clearUserInfo: () => void;
}
