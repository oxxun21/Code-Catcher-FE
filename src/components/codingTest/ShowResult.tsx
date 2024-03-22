import styled from "@emotion/styled";
import { TestScoreSubmit_I, ScoreSubmit_I, TestCase } from "../../interface";

export const ShowResult = ({ value }: { value: TestScoreSubmit_I | ScoreSubmit_I }) => {
  const prepareObjectForCounting = (scoreSubmit: ScoreSubmit_I) => {
    const { first, correct, ...testCasesOnly } = scoreSubmit;
    return testCasesOnly;
  };
  let result = prepareObjectForCounting(value as ScoreSubmit_I);
  const countCorrectTestCases = (testCases: TestScoreSubmit_I): string => {
    let totalCount = 0;
    let correctCount = 0;
    for (const key of Object.keys(testCases)) {
      totalCount++;
      if (testCases[key].correct) {
        correctCount++;
      }
    }
    return `${totalCount}개 중 ${correctCount}개 성공`;
  };

  const resultShow = (testCase: TestCase) => {
    if (testCase.error) {
      return `${testCase.error_message}`;
    } else if (testCase.correct) {
      return "테스트를 통과하였습니다.";
    } else {
      return `실행한 결과값 ${testCase.actual_output === "" ? "Null" : testCase.actual_output}이 기대값 ${
        testCase.expected_output
      }과 다릅니다.`;
    }
  };

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
            <CorrectnessIndicator correct={testCase.correct}>{resultShow(testCase)}</CorrectnessIndicator>
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
                {resultShow(value.testCase_3)}
              </CorrectnessIndicator>
            </tr>
          </tbody>
        </TestResultSection>
      )}
      <strong>테스트 결과</strong>
      <p>{"correct" in value ? countCorrectTestCases(result) : countCorrectTestCases(value)}</p>
      {"correct" in value ? <p>10 EXP 획득에 {value.correct ? "성공" : "실패"}하였습니다.</p> : undefined}
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
    &:first-of-type {
      margin-bottom: 12px;
    }
  }
`;

const TestResultSection = styled.table`
  padding: 15px 24px;
  background-color: #2a2a31;
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
    font-weight: 200;
    & > th:last-of-type {
      color: #fff;
    }
  }
  & > tbody > tr:first-of-type {
    width: 140px;
    text-align: right;
  }
`;

const CorrectnessIndicator = styled.td<{ correct: boolean }>`
  color: ${props => (props.correct ? "var(--system-positivie-color)" : "var(--system-negative-color)")};
  font-weight: ${props => props.correct && "600"};
`;
