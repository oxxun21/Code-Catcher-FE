export interface AiFeedbackProps_I {
  problemId: number;
  codeType: "java" | "python";
}

export interface AiFeedback_I {
  gptCode: string;
  gptCodeExplain: string;
}
