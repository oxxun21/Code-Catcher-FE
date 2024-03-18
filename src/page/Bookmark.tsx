import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookmarkAPI } from "../api";
import { Bookmark_I } from "../interface";
import { useDraggable } from "../hook";
import { Header, ReadOnlyEditor, SquareButton, TestDescSection } from "../components";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";

export const Bookmark = () => {
  const { id } = useParams();
  const [getBookmark, setGetBookmark] = useState<Bookmark_I | undefined>();
  const [activeTab, setActiveTab] = useState("myCode");
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
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

  useEffect(() => {
    (async () => {
      try {
        const response = await getBookmarkAPI(id);
        console.log(response);
        setGetBookmark(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "myCode":
        return (
          <ReadOnlyEditor
            code={getBookmark?.myCode ?? "// 콘솔을 확인해주세요"}
            language={getBookmark?.codeType ?? "java"}
          />
        );
      case "aiCode":
        return (
          <ReadOnlyEditor
            code={getBookmark?.gptCode ?? "// 콘솔을 확인해주세요"}
            language={getBookmark?.codeType ?? "java"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <PageHeader>
        <h2>{getBookmark?.title}</h2>
        <span>{getBookmark?.subject}</span>
      </PageHeader>
      <Contain>
        <TestDescSection descWidth={isMedia ? 100 : descWidth} question={getBookmark as Bookmark_I} />
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
          <div style={{ height: `${editorHeight}%` }}>
            <TabContainer>
              <TabButton onClick={() => setActiveTab("myCode")} isActive={activeTab === "myCode"}>
                My Code
              </TabButton>
              <TabButton onClick={() => setActiveTab("aiCode")} isActive={activeTab === "aiCode"}>
                AI Code
              </TabButton>
            </TabContainer>
            {renderTabContent()}
          </div>
          <Gutter orientation="vertical" onMouseDown={startDragVertical} />
          <div style={{ height: `${100 - editorHeight}%` }} className="feedback">
            <strong>AI Feedback</strong>
            <p>{getBookmark?.gptExplain}</p>
          </div>
        </CodeContain>
      </Contain>
      <ButtonContain>
        <SquareButton as={Link} to="/" text="나가기" />
      </ButtonContain>
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

const CodeContain = styled.section`
  display: flex;
  flex-direction: column;
  & > .feedback {
    background-color: #3f3f47;
    font-size: 0.75rem;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-button:vertical:start:decrement,
    ::-webkit-scrollbar-button:vertical:start:increment,
    ::-webkit-scrollbar-button:vertical:end:decrement {
      display: block;
      height: 5px;
    }
    * {
      scrollbar-width: thin;
      scrollbar-color: #555 transparent;
    }
    & > strong {
      padding: 1rem;
      padding-top: 0;
      display: block;
      font-family: var(--font--Galmuri);
      color: #fff;
      font-weight: 600;
      border-bottom: 2px solid var(--background-color);
    }
    & > p {
      padding: 24px 22px;
      line-height: 2;
    }
  }
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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 13px 22px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 0.875rem 2.5rem;
  background-color: #2a2a31;
  color: ${props => (props.isActive ? "#fff" : "#363738")};
  border: none;
  font-family: var(--font--Galmuri);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const Gutter = styled.div<{ orientation: "vertical" | "horizontal" }>`
  width: ${props => props.orientation === "horizontal" && "24px"};
  height: ${props => props.orientation === "vertical" && "24px"};
  background: ${props =>
    props.orientation === "horizontal"
      ? `url(${gutter_horizontal}) no-repeat center`
      : `url(${gutter_vertical}) #3F3F47 no-repeat center`};
  background-size: ${props => (props.orientation === "horizontal" ? "auto/40px" : "40px/auto")};
  border-right: ${props => props.orientation === "horizontal" && "2px solid var(--background-color)"};
  border-top: ${props => props.orientation === "vertical" && "2px solid var(--background-color)"};
  cursor: ${props => (props.orientation === "horizontal" ? "e-resize" : "n-resize")};
  margin-top: 1rem;
  z-index: 1;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
