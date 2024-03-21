export interface TestCase {
  error: boolean;
  error_message: null | string;
  input: string;
  expected_output: string;
  actual_output: string;
  correct: boolean;
}

export interface TestScoreSubmit_I {
  [key: string]: TestCase;
}

interface ScoreSubmitAdditionalProps {
  correct: boolean;
  first: boolean;
}

export type ScoreSubmit_I = TestScoreSubmit_I & ScoreSubmitAdditionalProps;
