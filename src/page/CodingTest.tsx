import { CodeEditor, Modal, SelectLang, TestDescSection, TestResultSection } from "../components";
import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import { useDraggable } from "../hook";
import { useState } from "react";

export const CodingTest = () => {
  const [isModal, setIsModal] = useState(true);
  const {
    width: descWidth,
    height: editorHeight,
    startDragHorizontal,
    startDragVertical,
  } = useDraggable({ initialWidth: 40, initialHeight: 60 });

  const isMedia = window.innerWidth <= 768;

  const handleClose = () => {
    setIsModal(prev => !prev);
  };

  return (
    <>
      <PageHeader>
        <h2>두 수의 차</h2>
        <span>Lv.1</span>
      </PageHeader>
      <Contain>
        <TestDescSection descWidth={isMedia ? 100 : descWidth} />
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
          <SelectLang />
          <CodeEditor editorHeight={editorHeight} />
          <Gutter orientation="vertical" onMouseDown={startDragVertical} />
          <TestResultSection editorHeight={editorHeight} />
        </CodeContain>
      </Contain>
      <ButtonContain>
        <button disabled>초기화</button>
        <button disabled>코드 실행</button>
        <button onClick={() => setIsModal(true)}>제출 후 채점하기</button>
      </ButtonContain>
      {isModal && (
        <Modal onClose={handleClose}>
          <p>Hi</p>
        </Modal>
      )}
    </>
  );
};

const PageHeader = styled.div`
  background-color: #32323a;
  padding: 22px 34px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-color);
  & > h2 {
    font-size: 1.375rem;
    display: inline-block;
    margin-right: 1rem;
  }
  & > span {
    color: var(--gray400-color);
    font-size: 0.875rem;
  }
`;

const Contain = styled.div`
  display: flex;
  background-color: var(--gray500-color);
  height: 81vh;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const CodeContain = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
`;

const ButtonContain = styled.div`
  width: 100%;
  padding: 12px 24px;
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
