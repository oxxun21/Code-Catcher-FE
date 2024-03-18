import { Global } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import reset from "./style/reset";
import { Home } from "./page/Home";
import { Splash } from "./page/Splash";
import { KakaoRedirection } from "./page/KakaoRedirection";
import { CodingTest } from "./page/CodingTest";
import { CodeCompare } from "./page/CodeCompare";
import { NotFound } from "./page/NotFound";
import { QuestionSelect } from "./page/QuestionSelect";
import { MyPage } from "./page/MyPage";
import { MobilePopup } from "./components";
import { Bookmark } from "./page/Bookmark";

function App() {
  return (
    <>
      <BrowserRouter>
        <Global styles={reset} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/kakao/callback" element={<KakaoRedirection />} />
          <Route path="/codingTest/:id" element={<CodingTest />} />
          <Route path="/codeCompare/:id" element={<CodeCompare />} />
          <Route path="/bookmark/:id" element={<Bookmark />} />
          <Route path="/codingTest/select" element={<QuestionSelect />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path={"*"} element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
      <MobilePopup />
    </>
  );
}

export default App;
