import { useState } from "react";
import styled from "@emotion/styled";
import { Header, SplashCarousel } from "../components";
import KakaoImg from "../assets/kakao_logo.svg";

export const Splash = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundColors = ["#F5D3D3", "#D3E7F5", "#F5E9D3", "#D9F5D3"];
  const currentBgColor = backgroundColors[currentSlide];

  const handleKakaoLogin = () => {
    const kakaoRestApi = import.meta.env.VITE_KAKAO_REST_API;
    const rediretUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${rediretUri}&response_type=code`;
    window.location.href = link;
  };
  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection style={{ backgroundColor: currentBgColor }}>
          <div>
            <SplashCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            <StyledButton onClick={handleKakaoLogin}>
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
  background-color: #ffffff;
`;

const StyledSection = styled.section`
  width: 100%;
  padding: 8.25rem 0 11.6875rem 0;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: relative;
    width: 100%;
    max-width: 74.0625rem;
    overflow: hidden;
    margin: 0 0.625rem;
    @media (max-width: 768px) {
      height: auto;
      overflow: visible;
    }
  }
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 0 1rem;
  border: none;
  background-color: #fee500;
  color: #000000;
  font-size: 1rem;
  width: 10.875rem;
  height: 3.125rem;
  border-radius: 6px;
  cursor: pointer;
  & > img {
    margin-right: 2.375rem;
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: -20%;
  }
`;
