import { instance } from "./instance.ts";
import { QuestionOutline_I } from "../interface";

export const getQuestionListAPI = async (): Promise<QuestionOutline_I[] | undefined> => {
  try {
    const response = await instance.get(`/coding/questionlist`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
