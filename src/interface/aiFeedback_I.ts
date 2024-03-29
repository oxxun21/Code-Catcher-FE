export interface AiFeedbackProps_I {
  problemId: number;
  codeType: "java" | "python";
}

export interface UserAiFeedbackProps_I {
  problemId: number;
  myCode: string;
}

export interface AiFeedback_I {
  gptCode: string;
  gptCodeExplain: string;
  isUsed: boolean;
}

export interface UserAiFeedback_I {
  time: string;
  memory: string;
  suggest: string;
}
