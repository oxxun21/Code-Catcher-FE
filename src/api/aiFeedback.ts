import { AiFeedbackProps_I, AiFeedback_I } from "../interface";
import { instance } from "./instance";

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
