import { instance } from "./instance.ts";
import { ProblemInfo_I, ProblemListAll_I } from "../interface";
import { formatDate } from "../utils/formatDate.ts";

export const getLastQuestionListAPI = async (page: number): Promise<ProblemListAll_I> => {
  try {
    const response = await instance.get(`/my-page/question?page=${page}`);
    const formattedData = {
      ...response.data,
      questionData: response.data.questionData.map((question: ProblemInfo_I) => ({
        ...question,
        createdAt: formatDate(question.createdAt),
      })),
    };
    return formattedData;
  } catch (error) {
    throw error;
  }
};
