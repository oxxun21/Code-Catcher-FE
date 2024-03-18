import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginCookie, removeLoginCookie } from "../../utils/loginCookie";
import { useUserStore } from "../../stores/useUserStore";
import LogoLight from "../../assets/Logo_light.svg";
import LogoDark from "../../assets/Logo_dark.svg";

export const Header = () => {
  const location = useLocation();
  const isDarkMode = location.pathname.startsWith("/codingTest") || location.pathname === "/codeCompare";
  const logoImage = isDarkMode ? LogoDark : LogoLight;
  const { clearUserInfo } = useUserStore.getState();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLoginCookie();
    setIsLoggedIn(!!token);
  }, []);

  const handleKakaoLogin = () => {
    const kakaoRestApi = import.meta.env.VITE_KAKAO_REST_API;
    const rediretUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${rediretUri}&response_type=code`;
    window.location.href = link;
  };

  const handleLogout = () => {
    removeLoginCookie({ path: "/" });
    clearUserInfo();
    localStorage.removeItem("userStore");
    setIsLoggedIn(false);
    navigate("/splash");
  };

  return (
    <StyledHeader isDarkMode={isDarkMode}>
      <h1>
        <img src={logoImage} alt="로고 이미지" />
      </h1>
      {!isLoggedIn ? (
        <StyledLoginBtn onClick={handleKakaoLogin}>로그인</StyledLoginBtn>
      ) : (
        <StyledBtnGroup>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate("/myPage")}>마이페이지</button>
        </StyledBtnGroup>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 0.875rem 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#17171B" : "#ffffff")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#222222")};

  & button {
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    color: ${({ isDarkMode }) => (isDarkMode ? "#ffffff" : "#222222")};
    background-color: ${({ isDarkMode }) => (isDarkMode ? "transparent" : "#ffffff")};
  }
`;

const StyledLoginBtn = styled.button`
  padding: 0.75rem 1.6563rem;
  background-color: #ffffff;
  color: #222222;
  border-radius: 999px;
  border: 1px solid #222222;
  background-color: #ffffff;
`;

const StyledBtnGroup = styled.div`
  & > button {
    border: none;
    background-color: transparent;
    padding: 0.625rem;
  }

  & > button:not(:first-child) {
    margin-left: 1.25rem;
  }
`;
