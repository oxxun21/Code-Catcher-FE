import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../components";
import { QuestionCard } from "../components";
import { QuestionOutline_I } from "../interface";
import { getQuestionListAPI } from "../api";

export const QuestionSelect = () => {
  const [questions, setQuestions] = useState<QuestionOutline_I[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionListAPI();
        if (data) {
          setQuestions(Object.values(data));
        }
      } catch (error) {
        console.error("질문 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleToCodingTest = () => {
    if (selectedQuestionId !== null) {
      navigate(`/codingTest/${selectedQuestionId}`);
    }
  };

  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection>
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              questionId={question.id}
              isSuccess={question.isSuccess}
              title={question.title}
              subject={question.subject}
              level={question.level}
              script={question.script}
              isSelected={selectedCard === index}
              isHovered={hoveredCard === index}
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
        <StyledButton
          onClick={handleToCodingTest}
          isSelected={selectedQuestionId !== null}
          disabled={selectedQuestionId === null}
        >
          시작하기
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
  background-color: #ffffff;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  width: 14.1875rem;
  line-height: 3.75rem;
  text-align: center;
  background-color: ${props => (props.isSelected ? "var(--main-color)" : "var(--gray400-color)")};
  color: #ffffff;
  font-family: var(--font--Galmuri);
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 1.25rem;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  &:hover {
    background-color: #8ce28c;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--gray400-color);
    &:hover {
      background-color: var(--gray400-color);
    }
  }
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
