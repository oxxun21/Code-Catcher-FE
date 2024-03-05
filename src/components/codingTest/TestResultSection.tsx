import styled from "@emotion/styled";

export const TestResultSection = ({ editorHeight }: { editorHeight: number }) => {
  return (
    <ResultSection style={{ height: `${100 - editorHeight}%` }}>
      <strong>실행 결과</strong>
      <article>실행 결과가 여기에 표시됩니다.</article>
    </ResultSection>
  );
};

const ResultSection = styled.section`
  & > strong {
    display: block;
    font-size: 0.875rem;
    padding: 0 24px 20px 24px;
    color: var(--gray400-color);
    font-weight: 600;
  }
  & > article {
    border-top: 2px solid var(--background-color);
    padding: 24px;
    color: var(--gray400-color);
    font-size: 0.75rem;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    border-top: 2px solid var(--background-color);
  }
`;
