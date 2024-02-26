import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reset from "./style/reset";
import { Main } from "./page/Main";

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
