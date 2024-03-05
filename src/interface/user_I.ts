export interface UserState {
  userId: string | null;
  nickname: string | null;
  setUserInfo: (userId: string, nickname: string) => void;
  clearUserInfo: () => void;
}
