import styled from "@emotion/styled";
import { Header, SplashCarousel } from "../components";
import KakaoImg from "../assets/kakao_logo.svg";

export const Splash = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection>
          <div>
            <SplashCarousel />
            <StyledButton>
              <img src={KakaoImg} alt="카카오 소셜 로고" />
              카카오 로그인
            </StyledButton>
          </div>
        </StyledSection>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSection = styled.section`
  width: 100%;
  height: 644px;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > div {
    width: 1185px;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 25%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-self: flex-start;
  padding: 0 48px 0 18px;
  border: none;
  background-color: #fee500;
  color: 000000;
  font-size: 18px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  & > img {
    margin-right: 38px;
  }
`;
