import { Global, css } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { MobilePopup } from "./components";

function App() {
  return (
    <>
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
          <Route path="/codeCompare" element={<CodeCompare />} />
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
