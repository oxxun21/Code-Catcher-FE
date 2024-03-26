import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookmarkAPI } from "../api";
import { Bookmark_I } from "../interface";
import { useDraggable } from "../hook";
import { Gutter, Header, ReadOnlyEditor, SquareButton, TestDescSection } from "../components";
import icon_grayStar from "../assets/icon_grayStar.svg";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const Bookmark = () => {
  const { id } = useParams();
  const [getBookmark, setGetBookmark] = useState<Bookmark_I | undefined>();
  const [activeTab, setActiveTab] = useState("myCode");
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

  useEffect(() => {
    (async () => {
      try {
        const response = await getBookmarkAPI(id);
        console.log(response);
        setGetBookmark(response);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        if (axiosError.response?.status === 404) {
          navigate("/404");
        }

        Swal.fire({
          title: "Sorry",
          text: `Bookmark Info ${axiosError?.message}`,
          width: 600,
          padding: "3em",
          color: "#44b044",
          background: "#fff",
          backdrop: `
          rgba(0,0,0,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `,
          confirmButtonColor: "#32cd32",
          confirmButtonText: "Close",
        });
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
      <Main>
        <PageHeader>
          <h2>마이페이지 &gt; 북마크 &gt; {getBookmark?.title}</h2>
          <span>
            Lv
            {Array.from({ length: getBookmark?.level as number }, _ => (
              <img src={icon_grayStar} alt={`레벨 ${getBookmark?.level}`} />
            ))}
          </span>
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
            <Gutter orientation="vertical" onMouseDown={startDragVertical} changeBackColor={false} />
            <FeedbackTitle>AI Feedback</FeedbackTitle>
            <FeedbackSection editorHeight={editorHeight}>
              <p>{getBookmark?.gptExplain}</p>
            </FeedbackSection>
          </CodeContain>
        </Contain>
        <ButtonContain>
          <SquareButton as={Link} to="/" text="나가기" />
        </ButtonContain>
      </Main>
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
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 1rem;
  font-weight: 400;
  & > span {
    color: var(--gray400-color);
    font-size: 14px;
  }
  & > span:first-of-type {
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: -10px;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: var(--gray700-color);
    }
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

const CodeContain = styled.section`
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

const FeedbackTitle = styled.strong`
  background-color: #3f3f47;
  display: block;
  font-size: 0.75rem;
  padding: 0 22px 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-color);
  font-family: var(--font--Galmuri);
`;

const FeedbackSection = styled.section<{ editorHeight: number }>`
  background-color: #3f3f47;
  color: var(--gray400-color);
  font-size: 0.75rem;
  overflow: auto;
  padding: 1.5rem;
  height: calc(100% - ${props => props.editorHeight + "%"} - 60px);
  & > p {
    color: #fff;
    line-height: 2;
  }
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
  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    border-top: 2px solid var(--background-color);
  }
`;
