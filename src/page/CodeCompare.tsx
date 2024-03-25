import styled from "@emotion/styled";
import icon_bookmark from "../assets/icon_bookmark.svg";
import icon_bookmark_true from "../assets/icon_bookmark_true.svg";
import { useDraggable } from "../hook";
import { Gutter, Header, Modal, ReadOnlyEditor, RoundButton, SquareButton } from "../components";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteBookmarkAPI, getAiFeedbackAPI, getBookmarkInfoAPI, patchBookmarkAPI, postBookmarkAPI } from "../api";
import { AiFeedback_I, BookmarkInfoOne_I } from "../interface";
import icon_tooltip from "../assets/icon_tooltip.svg";

export const CodeCompare = () => {
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 768);
  const {
    width: descWidth,
    height: editorHeight,
    startDragHorizontal,
    startDragVertical,
  } = useDraggable({ initialWidth: 40, initialHeight: 60 });
  const location = useLocation();
  const [isbookmark, setIsbookmark] = useState(false);
  const [bookmarkId, setBookmarkId] = useState();
  const [isConfirmBookmarkModal, setIsConfirmBookmarkModal] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useState<BookmarkInfoOne_I | undefined>();
  const [isModal, setIsModal] = useState(false);
  const [aiRes, setAiRes] = useState<AiFeedback_I | undefined>();
  const { id } = useParams();

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
        const response = await getAiFeedbackAPI({
          problemId: Number(id),
          codeType: location.state?.language,
        });
        setAiRes(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getBookmarkInfoAPI(Number(id));
        setBookmarkInfo(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  function formatDate(originalDateString: string) {
    const date = new Date(originalDateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  const handleBookmarkSave = async () => {
    try {
      const response = await postBookmarkAPI({
        problemId: Number(id),
        codeType: location.state?.language,
        code: location.state.myCode,
      });
      setBookmarkId(response);
      setIsbookmark(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(bookmarkId);
  console.log(bookmarkInfo);

  const handleBookmarkOff = async () => {
    try {
      const res = await deleteBookmarkAPI(bookmarkId);
      console.log(res);

      setIsbookmark(false);
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkReSave = async () => {
    try {
      const response = await patchBookmarkAPI({
        problemId: bookmarkInfo?.bookmarkId as string,
        codeType: location.state?.language,
        code: location.state.myCode,
      });
      setIsbookmark(true);
      setIsConfirmBookmarkModal(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAICodeReview = () => {};

  return (
    <>
      <Header />
      <Main>
        <PageHeader>
          <h2>{location.state.question.title}</h2>
          <span>{location.state.question.subject}</span>
        </PageHeader>
        <Contain>
          <section style={{ width: isMedia ? "100%" : `${descWidth}%` }}>
            <CompareHeader>
              <strong>My Code</strong>
            </CompareHeader>
            <ReadOnlyEditor code={location.state.myCode} language={location.state?.language} />
          </section>
          <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
          <section style={{ width: isMedia ? "100%" : `${100 - descWidth}%` }}>
            <div style={{ height: `${editorHeight}%` }}>
              <CompareHeader className="gptCode">
                <strong>AI Code</strong>
                <button
                  onClick={
                    !isbookmark && bookmarkInfo
                      ? () => setIsConfirmBookmarkModal(true)
                      : isbookmark
                      ? () => setIsModal(true)
                      : handleBookmarkSave
                  }
                >
                  북마크에 추가하기
                  <img src={isbookmark ? icon_bookmark_true : icon_bookmark} alt="북마크 아이콘" />
                </button>
              </CompareHeader>
              <ReadOnlyEditor code={aiRes?.gptCode as string} language={location.state?.language} />
            </div>
            <Gutter orientation="vertical" onMouseDown={startDragVertical} changeBackColor={false} />
            <FeedbackTitle>
              AI Feedback
              <span>
                <img src={icon_tooltip} alt="tooltip icon" />
              </span>
              <span className="tooltipInfo">AI Code에 대한 설명을 제공합니다.</span>
            </FeedbackTitle>
            <FeedbackSection editorHeight={editorHeight}>
              <p>{aiRes?.gptCodeExplain}</p>
            </FeedbackSection>
          </section>
        </Contain>
        <ButtonContain>
          <SquareButton onClick={handleAICodeReview} text="AI 코드 리뷰 시작하기" disabled={false} />
          <div className="notice">
            하루 1회에 한하여 <span>내가 작성한 코드에 대한 AI의 리뷰</span>를 제공합니다.
            <br /> 코드 리뷰를 받으면 해당 기능은 다음날까지 비활성화됩니다.
          </div>
          <SquareButton as={Link} to="/" text="나가기" white />
        </ButtonContain>
      </Main>
      {isModal && (
        <Modal onClose={() => setIsModal(prev => !prev)} modalHeader="Want to Cancel">
          <ModalContain>
            <strong>북마크를 해제 하시겠어요?</strong>
            <p>
              해제하기 버튼을 누르시면
              <br />
              북마크 목록에 저장되지 않습니다
            </p>
            <ModalButtonContain>
              <RoundButton text="취소" width="50%" onClick={() => setIsModal(false)} />
              <RoundButton text="해제하기" width="50%" onClick={handleBookmarkOff} dark />
            </ModalButtonContain>
          </ModalContain>
        </Modal>
      )}
      {isConfirmBookmarkModal && (
        <Modal onClose={() => setIsConfirmBookmarkModal(prev => !prev)} modalHeader="Want to Cancel">
          <ModalContain>
            <strong>이전에 저장한 내역이 있어요!</strong>
            <ReSaveModalContain>
              <span>저장한 날짜 {formatDate(bookmarkInfo?.createdAt as string)}</span>
              <p>지금 저장하면 기존 북마크 내역이 사라져요</p>
              <p>계속 진행하시겠어요?</p>
            </ReSaveModalContain>
            <ModalButtonContain>
              <RoundButton text="취소" width="50%" onClick={() => setIsConfirmBookmarkModal(false)} />
              <RoundButton text="네, 저장할게요" width="50%" onClick={handleBookmarkReSave} dark />
            </ModalButtonContain>
          </ModalContain>
        </Modal>
      )}
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

const CompareHeader = styled.div`
  padding: 1rem 22px;
  & > strong {
    display: block;
    font-family: var(--font--Galmuri);
    font-size: 12px;
    color: #fff;
    font-weight: 600;
  }
`;

const FeedbackTitle = styled.strong`
  background-color: #3f3f47;
  display: block;
  font-size: 0.75rem;
  padding: 0 22px 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-color);
  font-family: var(--font--Galmuri);
  & > span {
    display: inline-block;
    margin-left: 5px;
    & > img {
      vertical-align: sub;
    }
    &:hover + .tooltipInfo {
      visibility: visible;
    }
  }
  .tooltipInfo {
    visibility: hidden;
    font-family: var(--font--Pretendard);
    color: var(--gray300-color);
    border-radius: 4px;
    background-color: #2e2e31;
    padding: 7px 10px;
    font-size: 9px;
    position: relative;
    font-weight: 300;
    &::before {
      content: "";
      position: absolute;
      left: -4px;
      top: 7px;
      width: 8px;
      height: 8px;
      background-color: #2e2e31;
      transform: rotate(45deg);
    }
  }
`;

const Contain = styled.div`
  display: flex;
  height: calc(100vh - 10.875rem);

  .gptCode {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 22px;
    & > button {
      cursor: pointer;
      font-size: 12px;
      background-color: #282828;
      border-radius: 57px;
      padding: 12px 16px;
      color: #bdbdbd;
      font-weight: 600;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 5px;
      & > img {
        width: 15px;
      }
      &:hover {
        color: #fff;
      }
    }
  }

  & > section:first-of-type > div:last-of-type {
    margin-right: 10px;
    height: 85%;
    @media only screen and (max-width: 768px) {
      margin-right: 22px;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const ButtonContain = styled.div`
  width: 100%;
  padding: 10px 22px;
  display: flex;
  justify-content: space-between;
  background-color: var(--background-color);
  & > button:first-of-type {
    position: relative;
  }
  .notice {
    visibility: hidden;
    position: absolute;
    bottom: 85px;
    left: 22px;
    font-size: 0.875rem;
    line-height: 1.3;
    background: #d4fed4;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    color: #222;
    z-index: 100;
    & > span {
      color: #32cd32;
    }
    &::before {
      content: "";
      position: absolute;
      bottom: -7px;
      left: 20px;
      width: 15px;
      height: 15px;
      background-color: #d4fed4;
      transform: rotate(45deg);
    }
  }
  & > button:first-of-type:hover + .notice {
    visibility: visible;
  }

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
    display: block;
    font-weight: 600;
    margin-top: 12px;
    font-size: 1.125rem;
  }
  & > p {
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const ModalButtonContain = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ReSaveModalContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  & > span {
    padding: 10px 45px;
    font-size: 0.875rem;
    background-color: #f4f4f4;
    color: #454545;
    text-align: center;
    margin-top: 10px;
  }
  & > p {
    font-weight: 400;
    font-size: 0.875rem;
    &:first-of-type {
      color: #f53966;
    }
  }
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
