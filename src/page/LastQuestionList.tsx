import { useState, useEffect } from "react";
import { ProblemInfo_I } from "../interface";
import { getLastQuestionListAPI } from "../api";

export const LastQuestionList = () => {
  const [questions, setQuestions] = useState<ProblemInfo_I | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getLastQuestionListAPI(0);
        setQuestions(data);
      } catch (error) {
        console.error("지난 테스트 내역 불러오기 실패", error);
      }
    };

    fetchQuestions();
  }, []);
  console.log(questions);
  return <div>LastQuestionList</div>;
};
