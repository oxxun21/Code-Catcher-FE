import styled from "@emotion/styled";
import goHomeFont from "../assets/goHome.svg";
import notFoundBackground from "../assets/img_404.png";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Contain>
      <h2 className="a11y-hidden">404 페이지</h2>
      <TextContain>
        <p>THE PAGE YOU ARE LOOKING FOR NO LONGER EXISTS</p>
        <Link to="/">
          <img src={goHomeFont} alt="홈으로 가기" />
        </Link>
      </TextContain>
    </Contain>
  );
};

const Contain = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${notFoundBackground}) no-repeat center;
`;

const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: absolute;
  bottom: 158px;
  left: 50%;
  transform: translateX(-50%);
  & > a {
    background-color: var(--main-color);
    border-radius: 20px;
    padding: 20px 60px;
    position: relative;
    &::before {
      content: "";
      width: 15px;
      height: 7px;
      background-color: var(--background-color);
      position: absolute;
      right: 0;
      top: 15px;
    }
    &::after {
      content: "";
      width: 10px;
      height: 9px;
      background-color: var(--background-color);
      position: absolute;
      left: -1px;
      bottom: 17px;
    }
  }
`;
