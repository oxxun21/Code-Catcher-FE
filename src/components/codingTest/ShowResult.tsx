import styled from "@emotion/styled";
import { TestScoreSubmit_I, ScoreSubmit_I, TestCase } from "../../interface";

export const ShowResult = ({ value }: { value: TestScoreSubmit_I | ScoreSubmit_I }) => {
  const TestCaseComponent = ({ testCase, caption }: { testCase: TestCase; caption: string }) => {
    if (!testCase) return null;

    return (
      <TestResultSection>
        <caption>{caption}</caption>
        <tbody>
          <tr>
            <th>입력값</th>
            <th>기대값</th>
            <th>실행결과</th>
          </tr>
          <tr>
            <td>{testCase.input}</td>
            <td>{testCase.expected_output}</td>
            <CorrectnessIndicator correct={testCase.correct}>
              {testCase.correct
                ? "테스트를 통과하였습니다."
                : `실행한 결과값 ${testCase.actual_output}이 기대값 ${testCase.expected_output}과 다릅니다.`}
            </CorrectnessIndicator>
          </tr>
        </tbody>
      </TestResultSection>
    );
  };
  return (
    <TestResult>
      <TestCaseComponent testCase={value.testCase_1} caption="테스트 1" />
      <TestCaseComponent testCase={value.testCase_2} caption="테스트 2" />
      {"testCase_3" in value && (
        <TestResultSection>
          <caption>히든 케이스</caption>
          <tbody>
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
          </tbody>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > caption {
    text-align: left;
  }
  & > tbody {
    display: flex;
    gap: 1rem;
  }
  & > tbody > tr {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  & > tbody > tr:first-of-type {
    text-align: right;
    margin-left: 70px;
    & > tbody > th:last-of-type {
      color: #fff;
    }
  }
`;

const CorrectnessIndicator = styled.td<{ correct: boolean }>`
  color: ${props => (props.correct ? "var(--light-color)" : "#F53966")};
`;
