import { Global, css } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import reset from "./style/reset.tsx";
import datePicker from "./style/datepicker.tsx";
import { Home } from "./page/Home.tsx";
import { Splash } from "./page/Splash.tsx";
import { KakaoRedirection } from "./page/KakaoRedirection.tsx";
import { CodingTest } from "./page/CodingTest.tsx";
import { CodeCompare } from "./page/CodeCompare.tsx";
import { NotFound } from "./page/NotFound.tsx";
import { QuestionSelect } from "./page/QuestionSelect.tsx";
import { MyPage } from "./page/MyPage.tsx";
import { MobilePopup } from "./components";
import { Bookmark } from "./page/Bookmark.tsx";
import { BookmarkList } from "./page/BookmarkList.tsx";
import { LastQuestionList } from "./page/LastQuestionList.tsx";
import { metaData } from "./meta/metaData.ts";
import { HelmetRootMetaTags } from "./components";

function App() {
  return (
    <>
      <HelmetProvider>
        <HelmetRootMetaTags meta={metaData.app} />
        <BrowserRouter>
          <Global
            styles={css`
              ${reset}
              ${datePicker}
            `}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/kakao/callback" element={<KakaoRedirection />} />
            <Route path="/codingTest/:id" element={<CodingTest />} />
            <Route path="/codeCompare/:id" element={<CodeCompare />} />
            <Route path="/bookmark/:id" element={<Bookmark />} />
            <Route path="/question/select" element={<QuestionSelect />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/bookmarkList" element={<BookmarkList />} />
            <Route path="/lastQuestionList" element={<LastQuestionList />} />
            <Route path="/404" element={<NotFound />} />
            <Route path={"*"} element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
        <MobilePopup />
      </HelmetProvider>
    </>
  );
}

export default App;
