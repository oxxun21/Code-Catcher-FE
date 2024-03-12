import { instance } from "./instance";
import { ScoreSubmit_I } from "../interface";

interface SubmitProps {
  problemId: number;
  codeType: string;
  code: string;
}

export const postScoreSubmitAPI = async ({ problemId, codeType, code }: SubmitProps): Promise<ScoreSubmit_I> => {
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
