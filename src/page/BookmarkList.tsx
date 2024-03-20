import { useState, useEffect } from "react";
import { BookmarkInfo_I } from "../interface";
import { getBookmarkListAPI } from "../api";

export const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkInfo_I | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarkListAPI(0);
        setBookmarks(data);
      } catch (error) {
        console.error("북마크 리스트 불러오기 실패", error);
      }
    };

    fetchBookmarks();
  }, []);
  console.log(bookmarks);
  return <div>BookmarkList</div>;
};
