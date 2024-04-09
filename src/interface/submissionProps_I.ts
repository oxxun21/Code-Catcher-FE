import { UserAiFeedback_I } from ".";

export interface SubmissionProps_I {
  problemId: number | string;
  codeType: string;
  code: string;
  gptReview?: UserAiFeedback_I | null;
}
