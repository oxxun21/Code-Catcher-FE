import styled from "@emotion/styled";
import KakaoImg from "../assets/kakao_logo.svg";

export const Splash = () => {
  return (
    <main>
      <StyledButton>
        <img src={KakaoImg} alt="카카오 소셜 로고" />
        카카오 로그인
      </StyledButton>
    </main>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
