export interface UserState {
  userId: string | null;
  nickname: string | null;
  email: string | null;
  level: number | null;
  setUserInfo: (userInfo: {
    userId?: string | null;
    nickname?: string | null;
    email?: string | null;
    level?: number | null;
  }) => void;
  clearUserInfo: () => void;
}
