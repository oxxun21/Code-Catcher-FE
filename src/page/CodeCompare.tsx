import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import icon_bookmark from "../assets/icon_bookmark.svg";
import MyCode from "../assets/MyCode.svg";
import ChatGPTsCode from "../assets/ChatGPTsCode.svg";
import ChatGPTsFeedback from "../assets/ChatGPTsFeedback.svg";
import { useDraggable } from "../hook";
import { ReadOnlyEditor } from "../components";
import { Link } from "react-router-dom";

export const CodeCompare = () => {
  const {
    width: descWidth,
    height: editorHeight,
    startDragHorizontal,
    startDragVertical,
  } = useDraggable({ initialWidth: 40, initialHeight: 60 });

  const isMedia = window.innerWidth <= 768;

  const code = `function solution(t, p) {
    // ... 여기에 코드 ...
  }`;

  return (
    <>
      <PageHeader>
        <h2>두 수의 차</h2>
        <span>Lv.1</span>
      </PageHeader>
      <Contain>
        <section style={{ width: isMedia ? "100%" : `${descWidth}%` }}>
          <CompareHeader>
            <strong>
              <img src={MyCode} alt="My Code" />
            </strong>
          </CompareHeader>
          <ReadOnlyEditor code={code} />
        </section>
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <section style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
          <div style={{ height: `${editorHeight}%` }}>
            <CompareHeader className="gptCode">
              <strong>
                <img src={ChatGPTsCode} alt="Chat GPT's Code" />
              </strong>
              <button>
                북마크에 추가하기
                <img src={icon_bookmark} alt="북마크 아이콘" />
              </button>
            </CompareHeader>
            <ReadOnlyEditor code={code} />
          </div>
          <div style={{ height: `${100 - editorHeight}%` }} className="Feedback">
            <Gutter orientation="vertical" onMouseDown={startDragVertical} />
            <CompareHeader>
              <strong>
                <img src={ChatGPTsFeedback} alt="Chat GPT's Feedback" />
              </strong>
            </CompareHeader>
          </div>
        </section>
      </Contain>
      <ButtonContain>
        <Link to="/">나가기</Link>
      </ButtonContain>
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

const CompareHeader = styled.div`
  padding: 24px 22px;
`;

const Contain = styled.div`
  display: flex;
  background-color: var(--gray500-color);
  height: 81vh;

  .gptCode {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 22px;
    & > button {
      cursor: pointer;
      font-size: 0.875rem;
      background-color: #282828;
      border-radius: 57px;
      padding: 14px 20px;
      color: #bdbdbd;
      font-weight: 600;
      transition: all 0.3s;
      & > img {
        margin-left: 5px;
        width: 16px;
      }
      &:hover {
        color: #fff;
      }
    }
  }

  .Feedback {
    background-color: #3f3f47;
    & > div:last-of-type {
      padding-top: 0;
      border-bottom: 2px solid var(--background-color);
    }
  }
  & > section:first-of-type > div:last-of-type {
    margin-right: 10px;
    height: 85%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    height: 100%;
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

const ButtonContain = styled.div`
  width: 100%;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-end;
  & > a {
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
