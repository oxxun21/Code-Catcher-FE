import { AiFeedbackProps_I, AiFeedback_I, UserAiFeedbackProps_I } from "../interface";
import { instance } from "./instance.ts";

export const getAiFeedbackAPI = async ({ problemId, codeType }: AiFeedbackProps_I): Promise<AiFeedback_I> => {
  try {
    const response = await instance.get(`/coding/gpt/feedback`, {
      params: { problemId, codeType },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUserAiFeedbackAPI = async ({ myCode, problemId }: UserAiFeedbackProps_I) => {
  try {
    const response = await instance.post("/gpt/feedback", { myCode, problemId }, { timeout: 120000 });
    return response.data;
  } catch (error) {
    throw error;
  }
};
