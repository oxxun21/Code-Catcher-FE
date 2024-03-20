import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import icon_bookmark from "../assets/icon_bookmark.svg";
import icon_bookmark_true from "../assets/icon_bookmark_true.svg";
import { useDraggable } from "../hook";
import { Header, Modal, ReadOnlyEditor, RoundButton, SquareButton } from "../components";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteBookmarkAPI, getAiFeedbackAPI, postBookmarkAPI } from "../api";
import { AiFeedback_I } from "../interface";

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

  const handleBookmarkSave = async () => {
    if (isbookmark) {
      setIsModal(true);
      return;
    }
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

  const handleBookmarkOff = async () => {
    try {
      await deleteBookmarkAPI(bookmarkId);
      setIsbookmark(false);
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsModal(prev => !prev);
  };

  return (
    <>
      <Header />
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
              <button onClick={handleBookmarkSave}>
                북마크에 추가하기
                <img src={isbookmark ? icon_bookmark_true : icon_bookmark} alt="북마크 아이콘" />
              </button>
            </CompareHeader>
            <ReadOnlyEditor code={aiRes?.gptCode as string} language={location.state?.language} />
          </div>
          <div style={{ height: `${100 - editorHeight}%` }} className="Feedback">
            <Gutter orientation="vertical" onMouseDown={startDragVertical} />
            <CompareHeader>
              <strong>AI Feedback</strong>
            </CompareHeader>
            <p>{aiRes?.gptCodeExplain}</p>
          </div>
        </section>
      </Contain>
      <ButtonContain>
        <SquareButton as={Link} to="/" text="나가기" />
      </ButtonContain>
      {isModal && (
        <Modal onClose={handleClose} modalHeader="Cancel">
          <ModalContain>
            <p>북마크를 삭제하시겠습니까?</p>
            <div>
              <RoundButton text="아니오" width="50%" onClick={() => setIsModal(false)} />
              <RoundButton text="예" width="50%" onClick={handleBookmarkOff} dark />
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

const Contain = styled.div`
  display: flex;
  background-color: var(--gray500-color);
  height: 76vh;

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

  .Feedback {
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
    & > div:last-of-type {
      padding-top: 0;
      border-bottom: 2px solid var(--background-color);
    }
    & > p {
      padding: 24px 22px;
      line-height: 2;
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
  z-index: 1;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ButtonContain = styled.div`
  width: 100%;
  padding: 10px 22px;
  display: flex;
  justify-content: flex-end;
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
  & > p {
    font-weight: 600;
    margin-top: 12px;
  }
  & > div {
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;
