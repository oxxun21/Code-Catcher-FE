import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../components";
import { QuestionCard } from "../components";

const questionData = [
  {
    id: 1231235,
    title: "두 수의 차",
    subject: "사칙연산",
    level: 1,
    script:
      "정수 num1과 num2가 주어질 때, num1에서 num2를 뺀 값을 return하도록 soltuion 함수를 완성해주세요...기타등등...",
  },
  {
    id: 1231235,
    title: "두 수의 차",
    subject: "사칙연산",
    level: 2,
    script:
      "정수 num1과 num2가 주어질 때, num1에서 num2를 뺀 값을 return하도록 soltuion 함수를 완성해주세요...기타등등...",
  },
  {
    id: 1231235,
    title: "두 수의 차",
    subject: "사칙연산",
    level: 3,
    script:
      "정수 num1과 num2가 주어질 때, num1에서 num2를 뺀 값을 return하도록 soltuion 함수를 완성해주세요...기타등등...",
  },
];

export const QuestionSelect = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isAnyCardHovered = hoveredCard !== null;
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleToCodingTest = () => {
    if (selectedQuestionId !== null) {
      navigate(`/CodingTest/${selectedQuestionId}`);
    }
  };

  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection>
          {questionData.map((question, index) => (
            <QuestionCard
              key={index}
              questionId={question.id}
              title={question.title}
              subject={question.subject}
              level={question.level}
              script={question.script}
              isSelected={selectedCard === index}
              isHovered={isAnyCardHovered && selectedCard !== index} // 현재 카드가 선택되지 않았고, 어떤 카드라도 호버되었는지 확인
              onClick={() => {
                console.log(`Question ID: ${question.id}`);
                setSelectedCard(selectedCard === index ? null : index);
                setSelectedQuestionId(selectedCard === index ? null : question.id);
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </StyledSection>
        <StyledButton onClick={handleToCodingTest} isSelected={selectedQuestionId !== null}>
          start now
        </StyledButton>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  width: 14.1875rem;
  line-height: 3.75rem;
  text-align: center;
  background-color: ${props => (props.isSelected ? "var(--main-color)" : "#4b4b4b")};
  color: ${props => (props.isSelected ? "#ffffff" : "#222222")};
  font-family: var(--font--Galmuri);
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 1.25rem;
  cursor: pointer;
`;

const StyledSection = styled.section`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 768px) {
    height: fit-content;
    padding: 1.25rem;
    flex-direction: column;
    gap: 1.25rem;
  }
`;
