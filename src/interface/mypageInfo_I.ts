export interface MyPageInfo_I {
  bookmarkInfo: BookmarkInfo_I[];
  problemInfo: ProblemInfo_I[];
  achieveInfo: AchieveInfo_I[];
}

export interface BookmarkInfo_I {
  bookmarkId: string;
  level: number;
  problemId: number;
  title: string;
  createdAt: string;
}

export interface ProblemInfo_I {
  level: number;
  problemId: number;
  title: string;
  createdAt: string;
}

export interface AchieveInfo_I {
  createdAt: string;
  cnt: number;
}
