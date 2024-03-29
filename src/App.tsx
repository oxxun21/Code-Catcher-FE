import { Global, css } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import reset from "./style/reset";
import datePicker from "./style/datepicker";
import { Home } from "./page/Home";
import { Splash } from "./page/Splash";
import { KakaoRedirection } from "./page/KakaoRedirection";
import { CodingTest } from "./page/CodingTest";
import { CodeCompare } from "./page/CodeCompare";
import { NotFound } from "./page/NotFound";
import { QuestionSelect } from "./page/QuestionSelect";
import { MyPage } from "./page/MyPage";
import { MobilePopup, RouteChangeTracker } from "./components";
import { Bookmark } from "./page/Bookmark";
import { BookmarkList } from "./page/BookmarkList";
import { LastQuestionList } from "./page/LastQuestionList";
import { metaData } from "./meta/metaData";
import { HelmetRootMetaTags } from "./components";

function App() {
  return (
    <>
      <HelmetProvider>
        <HelmetRootMetaTags meta={metaData.app} />
        <BrowserRouter>
          <RouteChangeTracker />
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

