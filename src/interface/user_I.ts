export interface UserState {
  userId: string | null;
  nickname: string | null;
  email: string | null;
  level: number | null;
  exp: number | null;
  expUpper: number | null;
  totalCnt: number | null;
  completeCnt: number | null;
  bookmarkCnt: number | null;
  setUserInfo: (userInfo: {
    userId?: string | null;
    nickname?: string | null;
    email?: string | null;
    level?: number | null;
    exp?: number;
    expUpper?: number;
    totalCnt?: number;
    completeCnt?: number;
    bookmarkCnt?: number;
  }) => void;
  clearUserInfo: () => void;
}
