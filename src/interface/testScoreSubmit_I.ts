export interface TestScoreSubmit_I {
  testCase_1: {
    error: boolean;
    error_message: null;
    input: string;
    expected_output: string;
    actual_output: string;
    correct: boolean;
  };
  testCase_2: {
    error: boolean;
    error_message: string;
    input: string;
    expected_output: string;
    actual_output: null;
    correct: boolean;
  };
}
