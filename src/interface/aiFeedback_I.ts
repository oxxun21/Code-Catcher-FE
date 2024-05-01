export interface AiFeedbackProps_I {
  problemId: number;
  codeType: "java" | "python" | "javascript";
}

export interface UserAiFeedbackProps_I {
  problemId: number;
  myCode: string;
}

export interface AiFeedback_I {
  gptCode: string;
  gptCodeExplain: string;
  used: boolean;
}

export interface UserAiFeedback_I {
  time: string;
  memory: string;
  suggest: string;
}
