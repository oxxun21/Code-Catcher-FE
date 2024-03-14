import styled from "@emotion/styled";
import { Header, SplashCarousel } from "../components";
import KakaoImg from "../assets/kakao_logo.svg";

export const Splash = () => {
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
        <StyledSection>
          <div>
            <SplashCarousel />
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
`;

const StyledSection = styled.section`
  width: 100%;
  padding: 132px 0 187px 0;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: relative;
    width: 100%;
    max-width: 1185px;
    overflow: hidden;
    margin: 0 10px;
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
  padding: 0 16px 0 16px;
  border: none;
  background-color: #fee500;
  color: #000000;
  font-size: 16px;
  width: 174px;
  height: 50px;
  border-radius: 6px;
  cursor: pointer;
  & > img {
    margin-right: 38px;
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: -20%;
  }
`;
