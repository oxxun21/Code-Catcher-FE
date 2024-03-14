import { instance } from "./instance";
import { Question_I } from "../interface";

export const getQuestionAPI = async (id: string | undefined): Promise<Question_I | undefined> => {
  try {
    const response = await instance.get(`/coding/mock/question?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
