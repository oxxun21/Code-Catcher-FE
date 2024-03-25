import {
  CodeEditor,
  Gutter,
  Header,
  Modal,
  RoundButton,
  SelectLang,
  SquareButton,
  TestDescSection,
  TestResultSection,
} from "../components";
import styled from "@emotion/styled";
import { useDraggable } from "../hook";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionAPI } from "../api";
import { QuestionOutline_I, Question_I, ScoreSubmit_I, SubmissionProps_I, TestScoreSubmit_I } from "../interface";
import icon_test_complete from "../assets/icon_test_complete.svg";
import icon_test_failed from "../assets/icon_test_failed.svg";
import { AxiosError } from "axios";
import { postRetryScoreSubmitAPI, postScoreSubmitAPI } from "../api/scoreSubmit";
import { postTestScoreSubmitAPI } from "../api/testScoreSubmit";
import { Loading } from "../components/common/Loading";

export const CodingTest = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question_I | undefined>();
  const [todayQuestionList, setTodayQuestionList] = useState<QuestionOutline_I[] | undefined>();
  const [language, setLanguage] = useState<"Java" | "Python">("Java");
  const [isModal, setIsModal] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [testValue, setTestValue] = useState<TestScoreSubmit_I | undefined>();
  const [submitValue, setSubmitValue] = useState<ScoreSubmit_I | undefined>();
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    width: descWidth,
    height: editorHeight,
    startDragHorizontal,
    startDragVertical,
  } = useDraggable({ initialWidth: 40, initialHeight: 60 });

  useEffect(() => {
    const handleResize = () => {
      setIsMedia(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsModal(prev => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getQuestionAPI(id);
        const questionData: Question_I = response.questionData.data;
        const todayQuestionListData: QuestionOutline_I[] = response.todayQuestionListData.data;
        setQuestion(questionData);
        setTodayQuestionList(todayQuestionListData);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status === 404) navigate("/404");
      }
    })();
  }, [id]);

  async function submissionFunc<T extends object>(
    apiFunc: (props: SubmissionProps_I) => Promise<T>,
    updateStateCallback: React.Dispatch<React.SetStateAction<any>>,
    completeFlag = false
  ) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("ID 숫자 변환 실패");
      return;
    }

    try {
      const response = await apiFunc({
        problemId: numericId,
        codeType: language.toLocaleLowerCase(),
        code: codeValue,
      });
      updateStateCallback(response);
      if (completeFlag) {
        setIsModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTestSubmit = () => {
    setSubmitValue(undefined);
    submissionFunc<TestScoreSubmit_I>(postTestScoreSubmitAPI, setTestValue);
  };

  // const doesIdExistInQuestions = (id: number) => {
  //   return Object.values(todayQuestionList as QuestionOutline_I[]).some(todayQuestion => todayQuestion.id === id);
  // };

  // console.log(doesIdExistInQuestions(Number(id))); // 이게 true면 오늘꺼

  const handleSubmit = () => {
    setTestValue(undefined);
    // console.log(submitValue);
    setIsLoading(true);
    if (submitValue?.first === false) {
      submissionFunc<ScoreSubmit_I>(postRetryScoreSubmitAPI, setSubmitValue, true);
    }
    submissionFunc<ScoreSubmit_I>(postScoreSubmitAPI, setSubmitValue, true);
    // 코딩 테스트 3문제 확인(오늘) -> id, isSuccess (오늘 정답을 맞춘적이 있는지 없는지 fail 모달 구별), 오늘 문제는 코딩 테스트 3문제 불러오기로 확인 -> postScoreSubmitAPI, 이 외는 postRetryScoreSubmitAPI
    // isFirst true -> 유저 정보 다시 불러와서 쿠기에 다시 저장 필요(코드 비교 페이지 나갈 때 가능?)
  };

  let message = "";

  if (submitValue?.first) {
    message = submitValue?.correct ? "10 EXP 획득!" : "EXP 획득 실패";
  } else {
    message = submitValue?.correct ? "정답입니다!" : "틀렸습니다";
  }

  console.log(question);
  console.log(todayQuestionList);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      <Header />
      <Main>
        <PageHeader>
          <h2>{question?.title}</h2>
          <span>{question?.subject}</span>
        </PageHeader>
        <Contain>
          <TestDescSection descWidth={isMedia ? 100 : descWidth} question={question as Question_I} />
          <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
          <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
            <SelectLang language={language} setLanguage={setLanguage} />
            <CodeEditor
              language={language}
              editorHeight={editorHeight}
              setCodeValue={setCodeValue}
              question={question}
            />
            <Gutter orientation="vertical" onMouseDown={startDragVertical} />
            <TestResultSection
              editorHeight={editorHeight}
              testValue={testValue as TestScoreSubmit_I}
              submitValue={submitValue as ScoreSubmit_I}
            />
          </CodeContain>
        </Contain>
        <ButtonContain>
          <SquareButton text="코드 실행" white onClick={handleTestSubmit} />
          <SquareButton text="제출 후 채점하기" onClick={handleSubmit} />
        </ButtonContain>
      </Main>
      {isModal && (
        <Modal onClose={handleClose} modalHeader={submitValue?.correct ? "Test Complete" : "Test Failed"}>
          <ModalContain>
            {submitValue?.first && (
              <img
                src={submitValue?.correct ? icon_test_complete : icon_test_failed}
                alt={submitValue?.correct ? "테스트 통과" : "테스트 실패"}
              />
            )}
            <strong>{message}</strong>
            <p>{submitValue?.correct ? "축하합니다! 문제를 맞추셨어요" : "다음 테스트엔 더 잘 할 수 있어요"}</p>
            <div>
              <RoundButton as={Link} to="/" text="홈으로" width="50%" />
              {submitValue?.correct ? (
                <RoundButton
                  text="AI 설명 보기"
                  onClick={() =>
                    navigate(`/CodeCompare/${id}`, {
                      state: {
                        question: {
                          title: question?.title,
                          subject: question?.subject,
                        },
                        language: language.toLowerCase(),
                        myCode: codeValue,
                      },
                    })
                  }
                  dark
                  width="50%"
                />
              ) : (
                <RoundButton text="다시 풀기" onClick={() => setIsModal(false)} dark width="50%" />
              )}
            </div>
          </ModalContain>
        </Modal>
      )}
      {isLoading && <Loading />}
    </>
  );
};

const Main = styled.main`
  height: calc(100vh - 4rem);
  background-color: #32323a;
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
  padding: 1rem 22px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-color);
  & > h2 {
    font-size: 1rem;
    display: inline-block;
    margin-right: 12px;
  }
  & > span {
    color: var(--gray400-color);
    font-size: 14px;
  }
`;

const Contain = styled.div`
  display: flex;
  height: calc(100vh - 10.875rem);

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const CodeContain = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContain = styled.div`
  width: 100%;
  padding: 10px 22px;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background-color: var(--background-color);
  @media only screen and (max-width: 768px) {
    position: relative;
  }
`;

const ModalContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  & > strong {
    font-size: 1.375rem;
    font-weight: 600;
    margin-top: 12px;
  }
  & > img {
    margin-top: 50px;
  }

  & > div {
    width: 100%;
    margin-top: 24px;
    display: flex;
    gap: 20px;
  }
`;
