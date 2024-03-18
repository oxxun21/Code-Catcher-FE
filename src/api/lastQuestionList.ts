import { instance } from "./instance";
import { ProblemInfo_I } from "../interface";

export const getLastQuestionListAPI = async (page: number): Promise<ProblemInfo_I> => {
  try {
    const response = await instance.get(`/my-page/question?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
