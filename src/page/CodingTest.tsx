import { CodeEditor, Header, Modal, SelectLang, TestDescSection, TestResultSection } from "../components";
import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import { useDraggable } from "../hook";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionAPI } from "../api";
import { Question_I } from "../interface";
import icon_test_complete from "../assets/icon_test_complete.svg";
import icon_test_failed from "../assets/icon_test_failed.svg";

const question = {
  title: "프린터 큐",
  subject: "큐",
  script:
    "여러분은 프린터의 작업 대기열을 관리하는 프로그램을 작성하고 있습니다. 각 프린트 작업에는 우선순위가 주어지며, 더 높은 우선순위의 작업을 먼저 인쇄해야 합니다. 우선순위는 1에서 9까지의 숫자로 표현되며, 숫자가 클수록 우선순위가 높습니다. 현재 대기열의 상태와 특정 작업의 위치가 주어졌을 때, 그 작업이 인쇄되기까지 얼마나 많은 시간이 걸리는지 계산하세요.",
  input_condition:
    "첫 번째 줄에는 작업의 개수와 참조하고자 하는 작업의 위치가 주어집니다. 두 번째 줄에는 대기열에 있는 각 작업의 우선순위가 주어집니다.",
  output_condition: "주어진 작업이 인쇄될 때까지 걸리는 시간(대기열에서의 위치 변경 횟수)을 반환합니다.",
  input_1: "3 0\n3 1 4\n",
  output_1: "2",
  input_2: "5 2\n1 1 9 1 1\n",
  output_2: "1",
  input_3: "4 2\n4 2 1 3\n",
  output_3: "2",
};

export const CodingTest = () => {
  const { id } = useParams();
  // const [question, setQuestion] = useState<Question_I | undefined>();
  const [language, setLanguage] = useState<"Java" | "Python">("Java");
  const [isModal, setIsModal] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const testComplete = true;

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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await getQuestionAPI(id);
  //       setQuestion(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [id]);

  const handleSubmit = () => {
    console.log(codeValue);
    setIsModal(true);
  };

  return (
    <>
      <Header />
      <PageHeader>
        <h2>{question.title}</h2>
        <span>{question.subject}</span>
      </PageHeader>
      <Contain>
        <TestDescSection descWidth={isMedia ? 100 : descWidth} question={question} />
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
          <SelectLang language={language} setLanguage={setLanguage} />
          <CodeEditor language={language} editorHeight={editorHeight} setCodeValue={setCodeValue} />
          <Gutter orientation="vertical" onMouseDown={startDragVertical} />
          <TestResultSection editorHeight={editorHeight} />
        </CodeContain>
      </Contain>
      <ButtonContain>
        <button>코드 실행</button>
        <button onClick={handleSubmit}>제출 후 채점하기</button>
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
              <Link to="/">홈으로</Link>
              {testComplete ? (
                <button
                  onClick={() =>
                    navigate("/CodeCompare", {
                      state: {
                        question: { title: question.title, subject: question.subject },
                        myCode: codeValue,
                      },
                    })
                  }
                >
                  Chat GPT 답안 보기
                </button>
              ) : (
                <button onClick={() => setIsModal(false)}>다시 풀기</button>
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
  height: 77vh;
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
  & > button {
    cursor: pointer;
    padding: 12px 24px;
    font-size: 1rem;
    background-color: #fff;
    color: #000;
    font-weight: 600;
    border-radius: 4px;
    &:disabled {
      background-color: #757575;
    }
  }
  & > button:last-of-type {
    background-color: var(--main-color);
    color: #fff;
  }
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

  & > div {
    width: 100%;
    margin-top: 24px;
    display: flex;
    gap: 20px;
    & > a,
    & > button {
      width: 50%;
      border-radius: 20px;
      background-color: #f4f4f4;
      border: 1px solid #dbdbdb;
      color: #000;
      padding: 16px;
      font-size: 0.875rem;
      text-align: center;
    }
    & > button {
      cursor: pointer;
      background-color: #222;
      border: none;
      color: #fff;
    }
  }
`;
