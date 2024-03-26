import styled from "@emotion/styled";
import { ScoreSubmit_I, TestScoreSubmit_I } from "../../interface";
import { ShowResult } from "./ShowResult";

interface TestResultProps {
  editorHeight: number;
  testValue?: TestScoreSubmit_I;
  submitValue?: ScoreSubmit_I;
}

export const TestResultSection = ({ editorHeight, testValue, submitValue }: TestResultProps) => {
  const resultValue = testValue || submitValue;
  return (
    <>
      <ResultTitle>실행 결과</ResultTitle>
      <ResultSection editorHeight={editorHeight}>
        {resultValue ? <ShowResult value={resultValue} /> : <article>실행 결과가 여기에 표시됩니다.</article>}
      </ResultSection>
    </>
  );
};

const ResultSection = styled.section<{ editorHeight: number }>`
  color: var(--gray400-color);
  font-size: 0.75rem;
  height: calc(100% - ${props => props.editorHeight}%);
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
    height: 5px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;
  }
  & > article {
    padding: 1.5rem;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    border-top: 2px solid var(--background-color);
  }
`;

const ResultTitle = styled.strong`
  display: block;
  font-size: 0.875rem;
  padding: 0 22px 20px;
  color: var(--gray200-color);
  font-weight: 500;
  border-bottom: 2px solid var(--background-color);
`;
