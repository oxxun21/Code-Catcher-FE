import styled from "@emotion/styled";
import { Question_I } from "./../../interface/question_I";

interface TestDescSectionProps {
  descWidth: number;
  question: Question_I;
}

export const TestDescSection = ({ descWidth, question }: TestDescSectionProps) => {
  return (
    <DescSection style={{ width: `${descWidth}%` }}>
      <DescArticle>
        <strong>문제 설명</strong>
        <p>{question.script}</p>
      </DescArticle>
      <DescArticle>
        <strong>입력</strong>
        <p>{question.input_condition}</p>
      </DescArticle>
      <DescArticle>
        <strong>출력</strong>
        <p>{question.output_condition}</p>
      </DescArticle>
      <DescArticle>
        <strong>입출력 예</strong>
        <InputAndOutput>
          <div>
            <p>예제 입력 1</p>
            <p>{question.input_1}</p>
          </div>
          <div>
            <p>예제 출력 1</p>
            <p>{question.output_1}</p>
          </div>
          <div>
            <p>예제 입력 2</p>
            <p>{question.input_2}</p>
          </div>
          <div>
            <p>예제 출력 2</p>
            <p>{question.output_2}</p>
          </div>
        </InputAndOutput>
      </DescArticle>
    </DescSection>
  );
};

const DescSection = styled.section`
  padding: 36px 28px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-button:vertical:start:decrement,
  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 15px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;
  }
`;

const DescArticle = styled.article`
  font-size: 0.875rem;
  line-height: 2;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  &:last-of-type {
    margin-bottom: 0;
  }
  & > strong {
    font-weight: 600;
    color: #989898;
    margin-bottom: 8px;
    display: block;
  }
`;

const InputAndOutput = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.75rem;
  & > div {
    background-color: #2a2a31;
    border-radius: 6px;
    padding: 10px 1rem;
    & > p:first-of-type {
      font-size: 0.75rem;
      color: var(--gray400-color);
    }
  }
`;
