import styled from "@emotion/styled";
import icon_mobile_info from "../../assets/icon_mobile_info.svg";

export const MobilePopup = () => {
  return (
    <MobileMessage>
      <img src={icon_mobile_info} alt="안내사항 아이콘" />
      <strong>안내사항</strong>
      <p>
        이 사이트는 콘텐츠 특성상
        <br />
        모바일 버전을 제공하지 않습니다.
        <br />
        PC에서 접속해 주세요.
      </p>
    </MobileMessage>
  );
};

const MobileMessage = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #17171b;
  color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  text-align: center;
  font-size: 20px;
  z-index: 1000;
  font-size: 0.875rem;
  line-height: 1.5;

  & > strong {
    font-family: var(--font--Galmuri);
    font-weight: 600;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
