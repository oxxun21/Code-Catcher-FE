import { instance } from "./instance";

export const getQuestionAPI = async (id: string | undefined) => {
  try {
    const [questionData, todayQuestionListData] = await Promise.all([
      instance.get(`/coding/question?id=${id}`),
      instance.get("/coding/questionlist"),
    ]);

    return { questionData, todayQuestionListData };
  } catch (error) {
    throw error;
  }
};
