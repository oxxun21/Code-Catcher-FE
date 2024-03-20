import { instance } from "./instance";
import { BookmarkInfo_I } from "../interface";

export const getBookmarkListAPI = async (page: number): Promise<BookmarkInfo_I> => {
  try {
    const response = await instance.get(`/my-page/bookmark?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
