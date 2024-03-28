import styled from "@emotion/styled";
import { UserAiFeedback_I } from "../../interface";
import icon_Lightbulb from "../../assets/icon_Lightbulb.svg";
import icon_Clock from "../../assets/icon_Clock.svg";
import icon_Save from "../../assets/icon_Save.svg";

export const UserAICodeReview = ({
  userAiReview,
  isUsed = true,
}: {
  userAiReview: UserAiFeedback_I;
  isUsed: boolean;
}) => {
  return (
    <UserAiCodeSection>
      <h3>AI 코드 리뷰</h3>
      {!userAiReview && !isUsed ? <div>AI에게 내 코드를 리뷰 받아보세요!</div> : null}
      {isUsed && !userAiReview ? <div>오늘의 코드 리뷰 1회를 이미 받았어요. 내일 다시 받아보세요!</div> : null}
      {userAiReview && (
        <>
          <div>
            <strong>
              <img src={icon_Clock} alt="시간 효율성 아이콘" />
              시간 효율성
            </strong>
            <p>{userAiReview.time}</p>
          </div>
          <div>
            <strong>
              <img src={icon_Save} alt="메모리 효율성 아이콘" />
              메모리 효율성
            </strong>
            <p>{userAiReview.memory}</p>
          </div>
          <div>
            <strong>
              <img src={icon_Lightbulb} alt="개선점 아이콘" />
              개선점
            </strong>
            <p>{userAiReview.suggest}</p>
          </div>
        </>
      )}
    </UserAiCodeSection>
  );
};

const UserAiCodeSection = styled.section`
  background-color: #2a2a31;
  border-radius: 6px;
  padding: 30px;
  margin: 22px 10px 22px 22px;
  white-space: pre-wrap;

  & > h3 {
    color: var(--point-color);
    font-family: var(--font--Galmuri);
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 32px;
  }

  & > div {
    font-size: 0.875rem;
    line-height: 1.6;
    margin-bottom: 1.625rem;
    & > strong {
      color: var(--gray400-color);
      font-size: 0.8125rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
      margin-bottom: 10px;
    }
    & > p {
      font-weight: 300;
    }
  }

  & > div:last-of-type {
    margin-bottom: 0;
  }
`;
