import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { updateNicknameAPI } from "../../api";
import styled from "@emotion/styled";
import * as images from "../../assets/level";
import editIcon from "../../assets/edit.svg";
import TooltipIcon from "../../assets/icon_tooltip.svg";
import LevelInfoImage from "../../assets/tooltip_level.svg";

export const UserCard = () => {
  const { nickname, email, level, exp, expUpper, totalCnt, completeCnt, bookmarkCnt, setUserInfo } = useUserStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNickname, setEditedNickname] = useState<string | null>(nickname);
  const [isVisible, setIsVisible] = useState(false);

  type LevelImages = {
    [key: number]: string;
  };

  const levelImages: LevelImages = {
    1: images.catLevel1,
    2: images.catLevel2,
    3: images.catLevel3,
    4: images.catLevel4,
    5: images.catLevel5,
  };

  const currentLevelImage = typeof level === "number" ? levelImages[level] : images.catLevel1;

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
            <span>
              <strong>Lv.{level}</strong>
              <StyledTooltip>
                <img
                  src={TooltipIcon}
                  alt="tooltip"
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
                />
                {isVisible && (
                  <StyledLevelInfoImage>
                    <img src={LevelInfoImage} alt="레벨 규정 설명" />
                  </StyledLevelInfoImage>
                )}
              </StyledTooltip>
            </span>
            <strong>
              EXP {exp}/{expUpper}
            </strong>
          </div>
          <StyledProgressBar value={exp?.toString()} max={expUpper?.toString()} />
        </StyledProgress>
        <img src={currentLevelImage} alt="사용자 캐릭터 이미지" />
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
              <span>{totalCnt}</span>
            </div>
            <div>
              <strong>Complete</strong>
              <span>{completeCnt}</span>
            </div>
            <div>
              <strong>Bookmark</strong>
              <span>{bookmarkCnt}</span>
            </div>
          </StyledStatistics>
        </div>
      </StyledCard>
    </>
  );
};

const StyledCard = styled.article`
  & > img {
    width: 246px;
    height: 222px;
    border-radius: 10px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  border: 1px solid #d1d1d1;
  border-radius: 1.25rem;
  padding: 2.5rem 3.875rem 2.8125rem 3.625rem;
  height: 34.1875rem;
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
  height: 1.625rem;
  color: var(--black-color);
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
    &:hover {
      filter: brightness(0) saturate(100%) invert(43%) sepia(94%) saturate(1357%) hue-rotate(78deg) brightness(119%)
        contrast(91%);
    }
  }
`;

const StyledNicknameInput = styled.div`
  height: 1.625rem;
  color: var(--black-color);
  background-color: var(--light-color);
  border-bottom: 1px var(--point-color) solid;

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
    &:hover {
      color: var(--dark-color);
    }
  }
`;

const StyledProgress = styled.div`
  margin-bottom: 2.0625rem;

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;

    & span {
      & > strong {
        font-size: 0.875rem;
        color: var(--black-color);
        font-weight: 500;
      }
      & > img {
        margin-left: 2px;
        cursor: pointer;
      }
    }
    & > strong {
      font-family: var(--font--Galmuri);
      font-size: 0.75rem;
      font-weight: bold;
      color: var(--gray400-color);
    }
  }
`;

const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;
  & > img {
    cursor: pointer;
  }
`;

const StyledLevelInfoImage = styled.div`
  position: absolute;
  top: 100%;
  left: -38px;
  max-width: 350.73px;
  max-height: 240px;
  z-index: 10;
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
    background-color: var(--point-color); /* 진행된 부분의 색상 */
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
      background-color: var(--gray200-color);
    }
  }

  & strong {
    color: #555555;
    font-size: 0.625rem;
    font-weight: 500;
    margin-bottom: 0.625rem;
  }

  & span {
    color: var(--black-color);
    font-family: var(--font--Galmuri);
    font-weight: bold;
    font-size: 0.875rem;
  }
`;
