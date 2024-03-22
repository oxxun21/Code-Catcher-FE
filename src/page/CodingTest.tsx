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
import { Question_I, ScoreSubmit_I, SubmissionProps_I, TestScoreSubmit_I } from "../interface";
import icon_test_complete from "../assets/icon_test_complete.svg";
import icon_test_failed from "../assets/icon_test_failed.svg";
import { AxiosError } from "axios";
import { postRetryScoreSubmitAPI, postScoreSubmitAPI } from "../api/scoreSubmit";
import { postTestScoreSubmitAPI } from "../api/testScoreSubmit";

export const CodingTest = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question_I | undefined>();
  const [language, setLanguage] = useState<"Java" | "Python">("Java");
  const [isModal, setIsModal] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [testValue, setTestValue] = useState<TestScoreSubmit_I | undefined>();
  const [submitValue, setSubmitValue] = useState<ScoreSubmit_I | undefined>();
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
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
        setQuestion(response);
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
    }
  }

  const handleTestSubmit = () => {
    setSubmitValue(undefined);
    submissionFunc<TestScoreSubmit_I>(postTestScoreSubmitAPI, setTestValue);
  };

  const handleSubmit = () => {
    setTestValue(undefined);
    console.log(submitValue);

    if (submitValue?.first === false) {
      submissionFunc<ScoreSubmit_I>(postRetryScoreSubmitAPI, setSubmitValue, true);
    }
    submissionFunc<ScoreSubmit_I>(postScoreSubmitAPI, setSubmitValue, true);
  };

  let message = "";

  if (submitValue?.first) {
    message = submitValue?.correct ? "10 EXP 획득!" : "EXP 획득 실패";
  } else {
    message = submitValue?.correct ? "정답입니다!" : "틀렸습니다";
  }

  return (
    <>
      <Header />
      <PageHeader>
        <h2>{question?.title}</h2>
        <span>{question?.subject}</span>
      </PageHeader>
      <Contain>
        <TestDescSection descWidth={isMedia ? 100 : descWidth} question={question as Question_I} />
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
          <SelectLang language={language} setLanguage={setLanguage} />
          <CodeEditor language={language} editorHeight={editorHeight} setCodeValue={setCodeValue} />
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
      {isModal && (
        <Modal onClose={handleClose} modalHeader={submitValue?.correct ? "Test Complete" : "Test Failed"}>
          <ModalContain>
            {submitValue?.first ? (
              <img
                src={submitValue?.correct ? icon_test_complete : icon_test_failed}
                alt={submitValue?.correct ? "테스트 통과" : "테스트 실패"}
              />
            ) : undefined}

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
    </>
  );
};

const PageHeader = styled.div`
  background-color: #32323a;
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
  background-color: var(--gray500-color);
  height: 76vh;
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
