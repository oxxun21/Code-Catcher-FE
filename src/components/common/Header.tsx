import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginCookie, removeLoginCookie } from "../../utils/loginCookie";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLoginCookie();
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    removeLoginCookie({ path: "/" });
    setIsLoggedIn(false);
    navigate("/splash");
  };

  return (
    <StyledHeader>
      <h1>Codee</h1>
      {!isLoggedIn ? (
        <StyledLoginBtn>로그인</StyledLoginBtn>
      ) : (
        <StyledBtnGroup>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate("/my-page")}>마이페이지</button>
        </StyledBtnGroup>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color);

  & > h1 {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
  }

  & button {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const StyledLoginBtn = styled.button`
  padding: 12px 26.5px;
  background-color: #ffffff;
  color: #222222;
  border-radius: 999px;
`;

const StyledBtnGroup = styled.div`
  & > button {
    border: none;
    background-color: transparent;
    padding: 10px;
  }

  & > button:not(:first-child) {
    margin-left: 20px;
  }
`;
