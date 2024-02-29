import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reset from "./style/reset";
import { Main } from "./page/Main";
import { CodingTest } from "./page/CodingTest";
import { CodeCompare } from "./page/CodeCompare";

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/CodingTest" element={<CodingTest />} />
        <Route path="/CodeCompare" element={<CodeCompare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
