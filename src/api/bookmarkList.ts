import { instance } from "./instance.ts";
import { BookmarkInfo_I, BookmarkListAll_I } from "../interface";
import { formatDate } from "../utils/formatDate.ts";

export const getBookmarkListAPI = async (page: number): Promise<BookmarkListAll_I> => {
  try {
    const response = await instance.get(`/my-page/bookmark?page=${page}`);
    const formattedData = {
      ...response.data,
      questionData: response.data.questionData.map((question: BookmarkInfo_I) => ({
        ...question,
        createdAt: formatDate(question.createdAt),
      })),
    };
    return formattedData;
  } catch (error) {
    console.error("북마크 리스트 가져오기 오류", error);
    throw error;
  }
};

export const deleteBookmarkManyAPI = async (currentPage: number, bookmarkList: string[]) => {
  try {
    const response = await instance.delete(`/bookmark/many`, {
      data: { currentPage, bookmarkList },
    });
    if (response.data) {
      const formattedData = {
        ...response.data,
        questionData: response.data.questionData.map((question: BookmarkInfo_I) => ({
          ...question,
          createdAt: formatDate(question.createdAt),
        })),
      };
      return formattedData;
    } else {
      console.log("token 없음");
    }
  } catch (error) {
    console.error("북마크 삭제 오류", error);
    throw error;
  }
};
