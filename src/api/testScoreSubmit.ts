import { instance } from "./instance.ts";
import { SubmissionProps_I, TestScoreSubmit_I } from "../interface";

export const postTestScoreSubmitAPI = async ({
  problemId,
  codeType,
  code,
}: SubmissionProps_I): Promise<TestScoreSubmit_I> => {
  try {
    const response = await instance.post("/score/testcase", {
      problemId,
      codeType,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
