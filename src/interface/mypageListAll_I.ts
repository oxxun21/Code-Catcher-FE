import { ProblemInfo_I, BookmarkInfo_I } from "./mypageInfo_I";

export interface ProblemListAll_I {
  questionData: ProblemInfo_I[];
  totalPage: number;
  currentPage: number;
}

export interface BookmarkListAll_I {
  questionData: BookmarkInfo_I[];
  totalPage: number;
  currentPage: number;
}
