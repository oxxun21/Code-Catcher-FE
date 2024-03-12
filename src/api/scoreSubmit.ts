import { instance } from "./instance";
import { ScoreSubmit_I, SubmissionProps_I } from "../interface";

export const postScoreSubmitAPI = async ({ problemId, codeType, code }: SubmissionProps_I): Promise<ScoreSubmit_I> => {
  try {
    const response = await instance.post("/score/mock/submit", {
      problemId,
      codeType,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
