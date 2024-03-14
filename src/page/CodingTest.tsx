import {
  CodeEditor,
  Header,
  Modal,
  RoundButton,
  SelectLang,
  SquareButton,
  TestDescSection,
  TestResultSection,
} from "../components";
import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import { useDraggable } from "../hook";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionAPI } from "../api";
import { Question_I, ScoreSubmit_I, SubmissionProps_I, TestScoreSubmit_I } from "../interface";
import icon_test_complete from "../assets/icon_test_complete.svg";
import icon_test_failed from "../assets/icon_test_failed.svg";
import { AxiosError } from "axios";
import { postScoreSubmitAPI } from "../api/scoreSubmit";
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
  let testComplete;

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
      const response = await apiFunc({ problemId: numericId, codeType: language, code: codeValue });
      updateStateCallback(response);
      if (completeFlag) {
        if ("correct" in response && response.correct !== undefined) {
          testComplete = response?.correct;
          setIsModal(true);
        }
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
    submissionFunc<ScoreSubmit_I>(postScoreSubmitAPI, setSubmitValue, true);
  };

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
        <Modal onClose={handleClose} modalHeader={testComplete ? "Test Complete" : "Test Failed"}>
          <ModalContain>
            <img
              src={testComplete ? icon_test_complete : icon_test_failed}
              alt={testComplete ? "테스트 통과" : "테스트 실패"}
            />
            <strong>{testComplete ? "10 EXP 획득!" : "EXP 획득 실패"}</strong>
            <p>{testComplete ? "축하합니다! 문제를 맞추셨어요" : "다음 테스트엔 더 잘 할 수 있어요"}</p>
            <div>
              <RoundButton as={Link} to="/" text="홈으로" width="50%" />
              {testComplete ? (
                <RoundButton
                  text="AI 설명 보기"
                  onClick={() =>
                    navigate("/CodeCompare", {
                      state: {
                        question: { title: question?.title, subject: question?.subject },
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

const Gutter = styled.div<{ orientation: "vertical" | "horizontal" }>`
  width: ${props => props.orientation === "horizontal" && "24px"};
  height: ${props => props.orientation === "vertical" && "24px"};
  background: ${props =>
    props.orientation === "horizontal"
      ? `url(${gutter_horizontal}) no-repeat center`
      : `url(${gutter_vertical}) no-repeat center`};
  background-size: ${props => (props.orientation === "horizontal" ? "auto/40px" : "40px/auto")};
  border-right: ${props => props.orientation === "horizontal" && "2px solid var(--background-color)"};
  border-top: ${props => props.orientation === "vertical" && "2px solid var(--background-color)"};
  cursor: ${props => (props.orientation === "horizontal" ? "e-resize" : "n-resize")};
  @media only screen and (max-width: 768px) {
    display: none;
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
