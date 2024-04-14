import { useState } from "react";
import styled from "@emotion/styled";
import { Header, HelmetMetaTags, SplashCarousel } from "../components";
import KakaoImg from "../assets/kakao_logo.svg";
import { metaData } from "../meta/metaData.ts";
import { useEventTracker, useWindowSize } from "../hook";

export const Splash = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundColors = ["#F5D3D3", "#D3E7F5", "#F5E9D3", "#D9F5D3"];
  const currentBgColor = backgroundColors[currentSlide];

  const { windowWidth } = useWindowSize();
  const isMobile = (windowWidth ?? 0) <= 480;

  const handleKakaoLogin = () => {
    const kakaoRestApi = import.meta.env.VITE_KAKAO_REST_API;
    const rediretUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${rediretUri}&response_type=code`;

    const trackEvent = useEventTracker();
    trackEvent({
      category: "Auth",
      action: "login",
      label: "Kakao",
    });

    window.location.href = link;
  };
  return (
    <>
      <HelmetMetaTags meta={metaData.splash} />
      <Header />
      <StyledMain>
        <StyledSection style={{ backgroundColor: currentBgColor }}>
          <div>
            <SplashCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            {!isMobile && (
              <StyledButton onClick={handleKakaoLogin}>
                <img src={KakaoImg} alt="카카오 소셜 로고" />
                카카오 로그인
              </StyledButton>
            )}
          </div>
        </StyledSection>
        {isMobile && (
          <StyledButton onClick={handleKakaoLogin}>
            <img src={KakaoImg} alt="카카오 소셜 로고" />
            카카오 로그인
          </StyledButton>
        )}
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: calc(100vh - 6.25rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StyledSection = styled.section`
  width: 100%;
  padding: 2rem 0;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 480px) {
    height: 515px;
    padding: 1.25rem 0;
  }

  & > div {
    position: relative;
    width: 100%;
    max-width: 74.0625rem;
    overflow: hidden;
    margin: 0 0.625rem;

    @media (max-width: 768px) {
      height: auto;
      overflow: visible;
      max-height: unset;
    }
  }
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 183px;
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

  @media (min-width: 768px) and (max-width: 880px) {
    bottom: 6.25rem;
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }

  @media only screen and (max-width: 480px) {
    top: 37.0625rem;
    bottom: unset;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    padding: 0 7.0625rem;
    white-space: nowrap;
    & > img {
      margin-right: 0.625rem;
    }
  }
`;
