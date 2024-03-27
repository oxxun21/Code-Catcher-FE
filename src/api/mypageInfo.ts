import { instance } from "./instance.ts";
import { MyPageInfo_I, BookmarkInfo_I, ProblemInfo_I } from "../interface";
import { formatDate } from "../utils/formatDate.ts";

export const getMyPageInfoAPI = async (): Promise<MyPageInfo_I | undefined> => {
  try {
    const response = await instance.get(`/my-page`);
    if (response.data) {
      // bookmarkInfo와 problemInfo 내의 모든 createdAt 값을 변환
      const { bookmarkInfo, problemInfo } = response.data;

      const formattedBookmarkInfo = bookmarkInfo.map((item: BookmarkInfo_I) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
      }));

      const formattedProblemInfo = problemInfo.map((item: ProblemInfo_I) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
      }));

      return {
        ...response.data,
        bookmarkInfo: formattedBookmarkInfo,
        problemInfo: formattedProblemInfo,
      };
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
