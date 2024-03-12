import { instance } from "./instance";
import { TestScoreSubmit_I } from "../interface";

interface SubmitProps {
  problemId: number;
  codeType: string;
  code: string;
}

export const postTestScoreSubmitAPI = async ({
  problemId,
  codeType,
  code,
}: SubmitProps): Promise<TestScoreSubmit_I> => {
  try {
    const response = await instance.post("/score/mock/testcase", {
      problemId,
      codeType,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
