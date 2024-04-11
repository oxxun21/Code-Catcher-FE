import styled from "@emotion/styled";
import StarFilled from "../../assets/star_green.svg";
import StarEmpty from "../../assets/star_transparent.svg";

interface QuestionCardProps {
  questionId: number;
  isSuccess: boolean | null;
  title: string;
  subject: string;
  level: number;
  script: string;
  isSelected: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface StyledCardProps {
  isSelected: boolean;
  isHovered: boolean;
}

export const QuestionCard = ({
  questionId,
  isSuccess,
  title,
  subject,
  level,
  script,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: QuestionCardProps) => {
  const validLevel = Math.min(3, Math.max(0, level));
  const stars = [...Array(validLevel).fill(StarFilled), ...Array(3 - validLevel).fill(StarEmpty)];
  const formattedQuestionId = `#${questionId.toString().padStart(4, "0")}`;

  return (
    <>
      <StyledCard
        onClick={onClick}
        isSelected={isSelected}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <StyledSpan>
          <span>{formattedQuestionId}</span>
          <StyledRank>
            {stars.map((star, index) => (
              <img key={index} src={star} alt="별" />
            ))}
          </StyledRank>
        </StyledSpan>
        <StyledDesc isSuccess={isSuccess}>
          <span>{isSuccess !== null ? (isSuccess ? "Complete" : "Failed") : ""}</span>
          <div>
            <h2>{title}</h2>
            <h3>{subject}</h3>
          </div>
          <div>
            <strong>문제 미리보기</strong>
            <p>{script}</p>
          </div>
        </StyledDesc>
      </StyledCard>
    </>
  );
};

const StyledCard = styled.article<StyledCardProps>`
  position: relative;
  border-radius: 20px;
  padding: 2.75rem 2.75rem 5.6875rem;
  width: 25rem;
  height: 34.1875rem;
  background-color: #fafafa;
  font-family: var(--font--Pretendard);
  cursor: pointer;
  box-shadow: 0 0 0 1px #d1d1d1;
  border: 4px solid transparent;
  transition: border-color 0.3s, background-color 0.3s;

  ${({ isSelected, isHovered }) => {
    if (isSelected) {
      if (isHovered) {
        return `
        border: 4px solid var(--point-color);
        background-color: rgba(50, 205, 50, 0.2);
    `;
      }
      return `
        border: 4px solid var(--point-color);
        background-color: rgba(50, 205, 50, 0.2);
      `;
    }
    if (isHovered) {
      return `
        background-color: #EAEAEA;
    `;
    }
  }}

  @media (max-width: 768px) {
    height: 22.5rem;
  }
`;
const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8.0625rem;
  & > span {
    font-size: 1.25rem;
    color: var(--secondary-color);
  }
`;
const StyledRank = styled.div`
  & > img:not(:last-of-type) {
    margin-right: 0.375rem;
  }
`;

const StyledDesc = styled.div<{ isSuccess: boolean | null }>`
  max-width: 19.5rem;
  height: 13.3125rem;
  word-break: keep-all;

  @media (max-width: 768px) {
    bottom: 2.5rem;
  }

  & > div:nth-of-type(1) {
    max-width: 312px;
    min-width: 66px;
  }

  & > div:nth-of-type(2) {
    position: absolute;
    bottom: 5.6875rem;
    @media (max-width: 768px) {
      top: 12.5rem;
    }
  }

  & > span {
    font-size: 0.625rem;
    font-weight: bold;
    line-height: 1.625rem;
    font-family: var(--font--Galmuri);
    color: ${({ isSuccess }) =>
      isSuccess === true ? "var(--system-positivie-color)" : "var(--system-negative-color)"};
    background-color: ${({ isSuccess }) => (isSuccess === true ? "rgba(57,143,245, 0.25)" : "rgba(245,57,102,0.2)")};
    border-radius: 999px;
    padding: 0.375rem 0.625rem;
    visibility: ${({ isSuccess }) => (isSuccess === null ? "hidden" : "visible")};
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--black-color);
    margin: 0.75rem 0;
    line-height: 122%;
  }
  & h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--secondary-color);
  }

  & strong {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray500-color);
  }
  & p {
    font-size: 0.875rem;
    line-height: 145%;
    color: var(--gray400-color);
    margin-top: 0.75rem;
    max-width: 19.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
