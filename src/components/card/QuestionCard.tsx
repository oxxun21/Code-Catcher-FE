import styled from "@emotion/styled";
import StarFilled from "../../assets/star_green.svg";
import StarEmpty from "../../assets/star_transparent.svg.svg";

interface QuestionCardProps {
  questionId: number;
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
  const stars = [
    ...Array(level).fill(StarFilled), // 레벨 수만큼 StarFilled로 채우기
    ...Array(3 - level).fill(StarEmpty), // 나머지는 StarEmpty로 두기
  ];
  return (
    <>
      <StyledCard
        onClick={onClick}
        isSelected={isSelected}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <StyledRank>
          {stars.map((star, index) => (
            <img key={index} src={star} alt="별" />
          ))}
        </StyledRank>
        <StyledDesc>
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
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 2.75rem 2.75rem 4.375rem;
  background-color: var(--gray500-color);
  font-family: var(--font--Pretendard);
  cursor: pointer;
  border: 4px solid transparent;
  opacity: 1;

  // hover 상태가 아닌 카드에 대한 스타일 조정
  ${({ isSelected, isHovered }) => {
    if (isSelected) {
      return `
        opacity: 1;
        border: 4px #ffffff solid;
      `;
    } else if (isHovered) {
      return `
        opacity: 0.3; 
      `;
    }
  }}

  &:hover {
    border: 4px #ffffff solid;
    opacity: 1;
  }
`;

const StyledRank = styled.div`
  text-align: right;
  & > img:not(:last-child) {
    margin-right: 0.375rem;
  }
`;

const StyledDesc = styled.div`
  margin-top: 11.25rem;
  flex-shrink: 1;

  @media (max-width: 768px) {
    margin-top: 0;
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--gray200-color);
    margin-bottom: 0.75rem;
  }
  & h3 {
    font-size: 1.25rem;
    font-weight: medium;
    color: #a5a5a5;
    margin-bottom: 2.938rem;
  }
  & strong {
    font-size: 0.875rem;
    font-weight: medium;
    color: var(--gray400-color);
  }
  & p {
    font-size: 0.875rem;
    color: var(--gray200-color);
    margin-top: 0.5.rem;
    width: 19.5rem;
  }
`;
