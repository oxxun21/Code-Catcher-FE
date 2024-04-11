import { BookmarkInfoOne_I, Bookmark_I, SubmissionProps_I } from "../interface";
import { instance } from "./instance.ts";

export const postBookmarkAPI = async ({ problemId, codeType, code, gptReview }: SubmissionProps_I) => {
  console.log(problemId, codeType, code, gptReview);

  try {
    const response = await instance.post("/bookmark", {
      problemId,
      codeType,
      code,
      gptReview,
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

export const getBookmarkInfoAPI = async (id: number): Promise<BookmarkInfoOne_I> => {
  try {
    const response = await instance.get(`/bookmark/record?problemId=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchBookmarkAPI = async ({ problemId, codeType, code, gptReview }: SubmissionProps_I) => {
  console.log(problemId, codeType, code, gptReview);
  try {
    const response = await instance.patch(`/bookmark?id=${problemId}`, { myCode: code, codeType, gptReview });
    return response.data;
  } catch (error) {
    throw error;
  }
};
