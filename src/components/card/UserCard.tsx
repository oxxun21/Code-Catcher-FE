import { useUserStore } from "../../stores/useUserStore";
import styled from "@emotion/styled";
import userImage from "../../assets/home_dummy_img.png";
import editIcon from "../../assets/edit.svg";

export const UserCard = () => {
  const { nickname } = useUserStore();

  return (
    <>
      <StyledCard>
        <img src={userImage} alt="사용자 캐릭터 이미지" />
        <div>
          <StyledUserInfo>
            <strong>{nickname}</strong>
            <button>
              <img src={editIcon} alt="닉네임 수정 아이콘" />
            </button>
            <span>Lv.1</span>
          </StyledUserInfo>
          <StyledProgressGroup>
            <StyledProgress>
              <div>
                <span>Lv.2까지</span>
                <span>EXP 30/90</span>
              </div>
              <StyledProgressBar value="30" max="90" />
            </StyledProgress>
            <StyledProgress>
              <div>
                <span>Lv.2까지</span>
                <span>20문제</span>
              </div>
              <StyledProgressBar value="30" max="90" />
            </StyledProgress>
          </StyledProgressGroup>
        </div>
      </StyledCard>
    </>
  );
};

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 440px;
  background-color: #444444;
  border-radius: 10px;
  padding: 60px 0 72px;
`;
const StyledUserInfo = styled.div`
  margin: 22px 0 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > strong {
    font-family: "Galmuri11";
    font-size: 20px;
    font-weight: bold;
  }
  & > button {
    border: none;
    background-color: transparent;
    padding: 5px;
  }
  & > span {
    margin-left: 12px;
    font-size: 18px;
  }
`;
const StyledProgressGroup = styled.div`
  & > div:nth-of-type(1) {
    margin-bottom: 34px;
  }
`;
const StyledProgress = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  & > div > span:nth-of-type(1) {
    font-size: 18px;
  }
  & > div > span:nth-of-type(2) {
    font-size: 16px;
  }
`;

const StyledProgressBar = styled.progress`
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 254px;
  height: 10px;

  &::-webkit-progress-bar {
    background-color: #d9d9d9; /* 진행 바 배경 색상 */
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: #878787; /* 진행된 부분의 색상 */
    border-radius: 10px;
  }
`;
