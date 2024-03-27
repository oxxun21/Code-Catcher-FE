import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Header, HelmetMetaTags } from "../components";
import { QuestionCard } from "../components";
import { QuestionOutline_I } from "../interface";
import { getQuestionListAPI } from "../api";
import { metaData } from "../meta/metaData.ts";

export const QuestionSelect = () => {
  const [questions, setQuestions] = useState<QuestionOutline_I[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [successCount, setSuccessCount] = useState<number>(0);

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionListAPI();
        if (data) {
          const questionsArray = Object.values(data);
          setQuestions(questionsArray);
          const successQuestionsCount = questionsArray.filter(question => question.isSuccess).length;
          setSuccessCount(successQuestionsCount);
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
      <HelmetMetaTags meta={metaData.questionSelect} />
      <Header />
      <StyledMain>
        <StyledSection>
          <StyledTodayCount>
            <span>TODAY</span>
            {successCount} / 3
          </StyledTodayCount>
          <StyledCardContainer>
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
                  setSelectedCard(selectedCard === index ? null : index);
                  setSelectedQuestionId(selectedCard === index ? null : question.id);
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            ))}
          </StyledCardContainer>
          <StyledButton
            onClick={handleToCodingTest}
            isSelected={selectedQuestionId !== null}
            disabled={selectedQuestionId === null}
          >
            시작하기
          </StyledButton>
        </StyledSection>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: calc(100vh - 6.25rem);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    background-color: var(--hover-color);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--gray400-color);
    &:hover {
      background-color: var(--gray400-color);
    }
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin: 1.5625rem 0 4.75rem;

  @media (max-width: 768px) {
    height: fit-content;
    padding: 1.25rem;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const StyledTodayCount = styled.div`
  align-self: flex-end;
  font-family: var(--font--Galmuri);
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 120%;
  color: var(--gray400-color);

  & > span {
    margin-right: 0.9375rem;
  }
`;
