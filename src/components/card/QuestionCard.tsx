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
        <StyledDesc>
          {isSuccess !== null && <span>{isSuccess ? "Complete" : "Failed"}</span>}
          <h2>{title}</h2>
          <h3>{subject}</h3>
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
  border: 4px solid #d1d1d1;
  transition: border-color 0.3s, background-color 0.3s;

  ${({ isSelected, isHovered }) => {
    if (isSelected || isHovered) {
      return `
        border-color: var(--light-color);
        background-color: rgba(50, 205, 50, 0.2);
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

  & > span {
    font-size: 1.25rem;
    color: #192e47;
  }
`;
const StyledRank = styled.div`
  & > img:not(:last-child) {
    margin-right: 0.375rem;
  }
`;

const StyledDesc = styled.div`
  position: absolute;
  bottom: 5.6875rem;
  max-width: 19.5rem;
  align-self: flex-end;
  word-break: keep-all;
  flex-shrink: 1;

  @media (max-width: 768px) {
    bottom: 2.5rem;
  }

  & > span {
    font-size: 0.625rem;
    font-weight: bold;
    line-height: 1.625rem;
    font-family: var(--font--Galmuri);
    background-color: #192e47;
    border-radius: 999px;
    padding: 0.375rem 0.625rem;
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: bold;
    color: #222222;
    margin: 0.75rem 0;
  }
  & h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #192e47;
    margin-bottom: 3.17rem;
  }

  & > div {
    height: 6.125rem;
    @media (max-width: 768px) {
      top: 12.5rem;
    }
  }

  & strong {
    font-size: 0.875rem;
    font-weight: 600;
    color: #8b8b8b;
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
