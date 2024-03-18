import { Bookmark_I, ScoreSubmit_I, SubmissionProps_I } from "../interface";
import { instance } from "./instance";

export const postBookmarkAPI = async ({ problemId, codeType, code }: SubmissionProps_I): Promise<ScoreSubmit_I> => {
  try {
    const response = await instance.post("/bookmark", {
      problemId,
      codeType,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookmarkAPI = async (id: string | undefined): Promise<Bookmark_I> => {
  if (id === undefined) {
    throw new Error("ID is undefined");
  }
  try {
    const response = await instance.get(`/bookmark?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBookmarkAPI = async (id: string | undefined) => {
  try {
    const response = await instance.delete(`/bookmark/one?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
