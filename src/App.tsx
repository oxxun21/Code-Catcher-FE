import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reset from "./style/reset";
import { Main } from "./page/Main";
import { Splash } from "./page/Splash";
import { KakaoRedirection } from "./page/KakaoRedirection";
import { CodingTest } from "./page/CodingTest";

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/kakao/callback" element={<KakaoRedirection />} />
        <Route path="/CodingTest" element={<CodingTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
