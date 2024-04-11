import { UserAiFeedback_I } from ".";

export interface Bookmark_I {
  codeType: string;
  myCode: string;
  title: string;
  subject: string;
  script: string;
  input_condition: string;
  output_condition: string;
  input_1: string;
  output_1: string;
  input_2: string;
  output_2: string;
  gptCode: string;
  gptExplain: string;
  level: number;
  gptReviewRes: UserAiFeedback_I | null;
}

export interface BookmarkInfoOne_I {
  bookmarkId: string;
  createdAt: string;
}
