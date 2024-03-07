import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import styled from "@emotion/styled";
import profileImage from "../../assets/profile_dummy_img.png";
import editIcon from "../../assets/edit.svg";

export const UserCard = () => {
  const { nickname, setUserInfo } = useUserStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNickname, setEditedNickname] = useState<string | null>(nickname);

  const handleEditClick = (): void => {
    if (isEditing) {
      setUserInfo({ nickname: editedNickname });
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter") {
      handleEditClick();
    }
  };

  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setEditedNickname(e.target.value);
  };

  const nicknameSpace = isEditing ? (
    <StyledNicknameInput>
      <input
        type="text"
        value={editedNickname || ""}
        onChange={handleNicknameChange}
        minLength={2}
        maxLength={6}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleEditClick}>save</button>
    </StyledNicknameInput>
  ) : (
    <StyledNickname>
      <h2>{nickname}</h2>
      <button onClick={handleEditClick}>
        <img src={editIcon} alt="닉네임 수정 아이콘" />
      </button>
    </StyledNickname>
  );

  return (
    <>
      <StyledCard>
        <img src={profileImage} alt="사용자 캐릭터 이미지" />
        <div>
          <StyledUserInfoGroup>
            <div>
              <span>Lv 1</span>
              {nicknameSpace}
            </div>
            <h3>ohhm009@gmail.com</h3>
          </StyledUserInfoGroup>
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
                <span>20문제 남음</span>
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
  min-width: 19.875rem;
  max-width: 23.125rem;
  background-color: #444444;
  border-radius: 0.625rem;
  padding: 2.125rem 2.25rem 2.625rem;
`;
const StyledUserInfoGroup = styled.div`
  margin: 1.375rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
  }
  & span {
    width: 2.1875rem;
    line-height: 1.25rem;
    margin-right: 0.375rem;
    font-family: var(--font--Galmuri);
    font-size: 0.625rem;
    font-weight: bold;
    color: var(--dark-color);
    background-color: var(--gray-600-color);
    border-radius: 62.4375rem;
    text-align: center;
  }
  & > h3 {
    font-size: 0.75rem;
    color: var(--gray400-color);
    margin-top: 0.5rem;
  }
`;

const StyledNickname = styled.div`
  display: flex;
  align-items: center;
  & > h2 {
    font-family: var(--font--Pretendard);
    font-size: 1.125rem;
    font-weight: bold;
  }
  & > button {
    border: none;
    background-color: transparent;
    padding: 0.3125rem;
    cursor: pointer;
  }
`;

const StyledNicknameInput = styled.div`
  background-color: var(--gray-600-color);
  padding: 0 0.125rem;
  border-bottom: 1px var(--light-color) solid;
  & > input {
    all: unset;
    font-family: var(--font--Pretendard);
    font-size: 0.75rem;
    color: #ffffff;
    max-width: 4.1875rem;
    line-height: 0.75rem;
  }
  & > button {
    font-family: var(--font--Galmuri);
    font-size: 0.625rem;
    padding: 8px 0;
    margin-left: 0.125rem;
    cursor: pointer;
  }
`;
const StyledProgressGroup = styled.div`
  & > div:nth-of-type(1) {
    margin-bottom: 2.5rem;
  }
`;
const StyledProgress = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5625rem;
  }
  & > div > span:nth-of-type(1) {
    font-size: 0.875rem;
  }
  & > div > span:nth-of-type(2) {
    font-family: var(--font--Galmuri);
    font-size: 0.75rem;
    font-weight: bold;
    color: #898989;
  }
`;

const StyledProgressBar = styled.progress`
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15.875rem;
  height: 0.5rem;

  &::-webkit-progress-bar {
    background-color: var(--gray-600-color); /* 진행 바 배경 색상 */
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: var(--light-color); /* 진행된 부분의 색상 */
    border-radius: 10px;
  }
`;
