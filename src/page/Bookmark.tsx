import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookmarkAPI } from "../api";
import { Bookmark_I } from "../interface";
import { useDraggable } from "../hook";
import { Gutter, Header, ReadOnlyEditor, SquareButton, TestDescSection } from "../components";
import icon_grayStar from "../assets/icon_grayStar.svg";
import { AxiosError } from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import icon_Lightbulb from "../assets/icon_Lightbulb.svg";
import icon_Clock from "../assets/icon_Clock.svg";
import icon_Save from "../assets/icon_Save.svg";

export const Bookmark = () => {
  const { id } = useParams();
  const [getBookmark, setGetBookmark] = useState<Bookmark_I | undefined>();
  const [activeTab, setActiveTab] = useState("myCode");
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { width: descWidth, startDragHorizontal } = useDraggable({ initialWidth: 40, initialHeight: 60 });

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
        setGetBookmark(response);
      } catch (error) {
        handleAxiosError({ text: "Bookmark Info", error: error as AxiosError, navigate });
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

  const renderTabContentReview = () => {
    switch (activeTab) {
      case "myCode":
        return (
          <>
            {getBookmark?.gptReviewRes ? (
              <FeedbackSection>
                <strong>AI 코드리뷰</strong>
                <FeedbackSectionContent>
                  <div>
                    <strong>
                      <img src={icon_Clock} alt="시간 효율성 아이콘" />
                      시간 효율성
                    </strong>
                    <p>{getBookmark?.gptReviewRes.time}</p>
                  </div>
                  <div>
                    <strong>
                      <img src={icon_Save} alt="메모리 효율성 아이콘" />
                      메모리 효율성
                    </strong>
                    <p>{getBookmark?.gptReviewRes.memory}</p>
                  </div>
                  <div>
                    <strong>
                      <img src={icon_Lightbulb} alt="개선점 아이콘" />
                      개선점
                    </strong>
                    <p>{getBookmark?.gptReviewRes.suggest}</p>
                  </div>
                </FeedbackSectionContent>
              </FeedbackSection>
            ) : (
              <FeedbackSection>
                <strong>AI 코드리뷰</strong>
                <p>코드 리뷰 받은 내역이 없습니다.</p>
              </FeedbackSection>
            )}
          </>
        );
      case "aiCode":
        return (
          <>
            <FeedbackSection>
              <strong>AI Feedback</strong>
              <FeedbackSectionContent>
                <p>{getBookmark?.gptExplain}</p>
              </FeedbackSectionContent>
            </FeedbackSection>
          </>
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
            {Array.from({ length: getBookmark?.level as number }, (_, index) => (
              <img key={index} src={icon_grayStar} alt={`레벨 ${getBookmark?.level}`} />
            ))}
          </span>
          <span>{getBookmark?.subject}</span>
        </PageHeader>
        <Contain>
          <TestDescSection descWidth={isMedia ? 100 : descWidth} question={getBookmark as Bookmark_I} />
          <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
          <CodeContain style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
            <div>
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
            {renderTabContentReview()}
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
    gap: 4px;
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
  justify-content: space-between;
  & > div {
    min-height: 60%;
  }
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
  background-color: ${props => (props.isActive ? "#3F3F47" : "#2a2a31")};
  color: ${props => (props.isActive ? "#fff" : "#363738")};
  border: none;
  font-family: var(--font--Galmuri);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const FeedbackSection = styled.section`
  height: 35%;
  background-color: #2a2a31;
  color: var(--gray400-color);
  font-size: 0.75rem;
  padding: 1.875rem;
  border-radius: 5px;
  margin: 0 22px 22px 22px;
  & > strong {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 28px;
    font-weight: 600;
    font-family: var(--font--Galmuri);
    color: var(--point-color);
  }

  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    border-top: 2px solid var(--background-color);
  }
`;

const FeedbackSectionContent = styled.div`
  height: 100%;
  overflow: auto;
  max-height: 85%;
  color: #fff;
  line-height: 1.6;
  font-size: 0.875rem;
  & > div {
    margin-bottom: 1.625rem;
    & > strong {
      color: var(--gray400-color);
      font-size: 0.8125rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
      margin-bottom: 10px;
    }
    & > p {
      font-weight: 300;
    }
    & > span {
      color: var(--gray500-color);
    }
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
`;
