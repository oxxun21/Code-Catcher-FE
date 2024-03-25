import styled from "@emotion/styled";
import loading_dot from "../../assets/loading_dot.gif";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export const Loading = () => {
  useEffect(() => {
    const root = document.body;
    root.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = root.style.top;
      root.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return createPortal(
    <BackgroundStyle>
      <LoadingComponent>
        <span>Loading</span>
        <img src={loading_dot} alt="로딩 화면" />
      </LoadingComponent>
    </BackgroundStyle>,
    document.getElementById("modal")!
  );
};
const BackgroundStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 99999;
`;

const LoadingComponent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font--Galmuri);
  color: var(--point-color);
  font-size: 2.25rem;
  font-weight: 600;
  & > img {
    margin-top: 35px;
  }
`;
