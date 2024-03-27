import { instance } from "./instance.ts";
import { ScoreSubmit_I, SubmissionProps_I } from "../interface";

const postScore = async (path: string, { problemId, codeType, code }: SubmissionProps_I): Promise<ScoreSubmit_I> => {
  try {
    const response = await instance.post(path, { problemId, codeType, code });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postScoreSubmitAPI = (submissionProps: SubmissionProps_I): Promise<ScoreSubmit_I> =>
  postScore("/score/submit/today", submissionProps);

export const postRetryScoreSubmitAPI = (submissionProps: SubmissionProps_I): Promise<ScoreSubmit_I> =>
  postScore("/score/submit/retry", submissionProps);
