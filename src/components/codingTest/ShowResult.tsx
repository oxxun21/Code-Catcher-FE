import styled from "@emotion/styled";
import { TestScoreSubmit_I, ScoreSubmit_I } from "../../interface";

interface ShowResultProps {
  testValue: TestScoreSubmit_I;
  submitValue: ScoreSubmit_I;
}

export const ShowResult = ({ testValue, submitValue }: ShowResultProps) => {
  console.log(testValue);
  console.log(submitValue);

  return (
    <TestResult>
      <TestResultSection>
        <caption>테스트 1</caption>
        <tr>
          <th>입력값</th>
          <th>기대값</th>
          <th>실행결과</th>
        </tr>
        <tr>
          <td>2, 3</td>
          <td>-1</td>
          <td>테스트를 통과하였습니다.</td>
        </tr>
      </TestResultSection>
      <TestResultSection>
        <caption>테스트 2</caption>
        <tr>
          <th>입력값</th>
          <th>기대값</th>
          <th>실행결과</th>
        </tr>
        <tr>
          <td>2, 3</td>
          <td>-1</td>
          <td>테스트를 통과하였습니다.</td>
        </tr>
      </TestResultSection>
      {submitValue && (
        <TestResultSection>
          <caption>히든 케이스</caption>
          <tr>
            <th>입력값</th>
            <th>기대값</th>
            <th>실행결과</th>
          </tr>
          <tr>
            <td>???</td>
            <td>???</td>
            <td>테스트를 통과하였습니다.</td>
          </tr>
        </TestResultSection>
      )}
      <strong>테스트 결과</strong>
      <p>2개 중 1개 성공</p>
    </TestResult>
  );
};

const TestResult = styled.article`
  & > strong {
    margin: 20px 0 12px;
    display: block;
    font-weight: 600;
  }
  & > p {
    color: #fff;
  }
`;

const TestResultSection = styled.table`
  padding: 15px 24px;
  background-color: #2c2c34;
  border-radius: 4px;
  color: #aaa;
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 7.5rem auto;
  gap: 1rem;
  & > caption {
    grid-column: 1 / 3;
    text-align: left;
  }
  & > tr {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  & > tr:first-of-type {
    text-align: right;
    & > th:last-of-type {
      color: #fff;
    }
  }
`;
