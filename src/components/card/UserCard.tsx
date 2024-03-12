import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import styled from "@emotion/styled";
import profileImage from "../../assets/profile_dummy_img.png";
import editIcon from "../../assets/edit.svg";
import { updateNicknameAPI } from "../../api";

export const UserCard = () => {
  const { nickname, email, level, setUserInfo } = useUserStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNickname, setEditedNickname] = useState<string | null>(nickname);

  const handleEditClick = async (): Promise<void> => {
    if (isEditing && editedNickname) {
      try {
        await updateNicknameAPI(setUserInfo, editedNickname);
      } catch (error) {
        console.error("닉네임 변경 중 오류 발생:", error);
      }
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
      <strong>{nickname}</strong>
      <button onClick={handleEditClick}>
        <img src={editIcon} alt="닉네임 수정 아이콘" />
      </button>
    </StyledNickname>
  );

  return (
    <>
      <StyledCard>
        <StyledProgress>
          <div>
            <span>Lv.{level}</span>
            <span>EXP 90/160</span>
          </div>
          <StyledProgressBar value="90" max="160" />
        </StyledProgress>
        <img src={profileImage} alt="사용자 캐릭터 이미지" />
        <div>
          <StyledUserInfoGroup>
            <div>
              <span>Lv {level}</span>
              {nicknameSpace}
            </div>
            <strong>{email}</strong>
          </StyledUserInfoGroup>
          <StyledStatistics>
            <div>
              <strong>Total</strong>
              <span>9</span>
            </div>
            <div>
              <strong>Complete</strong>
              <span>8</span>
            </div>
            <div>
              <strong>Bookmark</strong>
              <span>3</span>
            </div>
          </StyledStatistics>
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
  background-color: #fafafa;
  border: 1px solid #d1d1d1;
  border-radius: 1.25rem;
  padding: 2.5rem 3.875rem 2.8125rem 3.625rem;
`;
const StyledUserInfoGroup = styled.div`
  margin: 1.25rem 0 1.6875rem;
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
    color: #fafafa;
    background-color: var(--main-color);
    border-radius: 62.4375rem;
    text-align: center;
  }
  & > strong {
    font-size: 0.75rem;
    color: var(--gray400-color);
    margin-top: 0.5rem;
  }
`;

const StyledNickname = styled.div`
  color: #222222;
  display: flex;
  align-items: center;
  & > strong {
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
  color: #222222;
  background-color: #d4fed4;
  border-bottom: 1px var(--light-color) solid;

  & > input {
    all: unset;
    font-family: var(--font--Pretendard);
    font-size: 0.75rem;
    width: 4.1875rem;
    margin: 0 2px;
  }
  & > button {
    font-family: var(--font--Galmuri);
    font-size: 0.625rem;
    padding: 8px 2px;
    cursor: pointer;
  }
`;

const StyledProgress = styled.div`
  margin-bottom: 1.6875rem;
  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;
  }
  & > div > span:nth-of-type(1) {
    font-size: 0.875rem;
    color: #2a2a2a;
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
  width: 15.375rem;
  height: 0.5rem;

  &::-webkit-progress-bar {
    background-color: #eaeaea; /* 진행 바 배경 색상 */
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: var(--light-color); /* 진행된 부분의 색상 */
    border-radius: 10px;
  }
`;

const StyledStatistics = styled.div`
  display: flex;
  border: 1px solid #b3b3b3;
  border-radius: 18px;
  padding: 1.3125rem 1.375rem 1.5rem 1.875rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > div:nth-of-type(1) {
    padding-right: 2rem;
  }
  & > div:nth-of-type(2) {
    padding: 0 1rem 0;
  }
  & > div:nth-of-type(3) {
    padding-left: 1.25rem;
  }

  & > div:not(:last-of-type) {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: -1px;
      bottom: 0;
      width: 1px;
      height: 42px;
      background-color: #dbdbdb;
    }
  }

  & strong {
    color: #555555;
    font-size: 0.625rem;
    font-weight: 500;
    margin-bottom: 0.625rem;
  }

  & span {
    color: #222222;
    font-family: var(--font--Galmuri);
    font-weight: bold;
    font-size: 0.875rem;
  }
`;
