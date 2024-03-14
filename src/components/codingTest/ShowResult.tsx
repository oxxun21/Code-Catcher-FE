import styled from "@emotion/styled";
import { TestScoreSubmit_I, ScoreSubmit_I } from "../../interface";

export const ShowResult = ({ value }: { value: TestScoreSubmit_I | ScoreSubmit_I }) => {
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
          <td>{value.testCase_1.input}</td>
          <td>{value.testCase_1.expected_output}</td>
          <CorrectnessIndicator correct={value.testCase_1.correct}>
            {value.testCase_1.correct
              ? "테스트를 통과하였습니다."
              : `실행한 결과값 ${value.testCase_1.actual_output}이 기대값 ${value.testCase_1.expected_output}과 다릅니다.`}
          </CorrectnessIndicator>
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
          <td>{value.testCase_2.input}</td>
          <td>{value.testCase_2.expected_output}</td>
          <CorrectnessIndicator correct={value.testCase_2.correct}>
            {value.testCase_2.correct
              ? "테스트를 통과하였습니다."
              : `실행한 결과값 ${value.testCase_2.actual_output}이 기대값 ${value.testCase_2.expected_output}과 다릅니다.`}
          </CorrectnessIndicator>
        </tr>
      </TestResultSection>
      {"testCase_3" in value && (
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
            <CorrectnessIndicator correct={value.testCase_3.correct}>
              {value.testCase_3.correct
                ? "테스트를 통과하였습니다."
                : `실행한 결과값 ${value.testCase_3.actual_output}이 기대값 ${value.testCase_3.expected_output}과 다릅니다.`}
            </CorrectnessIndicator>
          </tr>
        </TestResultSection>
      )}
      <strong>테스트 결과</strong>
      {/* <p>개 중 1개 성공</p> */}
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

const CorrectnessIndicator = styled.td<{ correct: boolean }>`
  color: ${props => (props.correct ? "var(--light-color)" : "#F53966")};
`;
