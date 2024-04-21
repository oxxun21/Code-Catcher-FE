import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { BookmarkInfo_I, ProblemInfo_I } from "../../interface";
import StarPixel from "../../assets/star_pixel.svg";
import BookMarkEmptyImage from "../../assets/bookmark_empty.svg";
import LastEmptyImage from "../../assets/last_empty.svg";
import ArrowRightIcon from "../../assets/arrow_right_lastTests.svg";
import { useEventTracker } from "../../hook";
import { useCookies } from "react-cookie";

type ListType = "bookmark" | "lastTests";

interface MyPageListProps {
  listType: ListType;
  data: Array<BookmarkInfo_I | ProblemInfo_I>;
}

export const MypageList = ({ listType, data }: MyPageListProps) => {
  const [cookies] = useCookies(["googtrans"]);
  const isGoogTransEn = cookies.googtrans === "/ko/en";

  const isBookmark = listType === "bookmark";
  const title = isBookmark ? (isGoogTransEn ? "Bookmark" : "북마크") : isGoogTransEn ? "Test History" : "지난 테스트";
  const trackEvent = useEventTracker();

  const navigate = useNavigate();
  const handleItemClick = (item: BookmarkInfo_I | ProblemInfo_I) => {
    const routePrefix = isBookmark ? "/bookmark/" : "/codingTest/";
    const routeId = isBookmark ? (item as BookmarkInfo_I).bookmarkId : (item as ProblemInfo_I).problemId;

    navigate(`${routePrefix}${routeId}`);

    trackEvent({
      category: isBookmark ? "BookmarkList" : "LastQuestion",
      action: isBookmark ? "bookmarkItemClicked" : "lastQuestionItemClicked",
      label: `문제Id:${routeId}`,
    });
  };

  const handleMoreClick = () => {
    navigate(isBookmark ? "/bookmarkList" : "/lastQuestionList");

    if (isBookmark) {
      trackEvent({
        category: "BookmarkList",
        action: "bookmarkListMore",
      });
    } else {
      trackEvent({
        category: "LastQuestionList",
        action: "lastQuestionListMore",
      });
    }
  };

  const handleNavigateToQuestionSelect = () => {
    trackEvent({
      category: "CodingTest",
      action: "goToQuestionSelect",
    });

    navigate("/question/select");
  };

  const isEmpty = data.length === 0;
  const EmptyComponent = () => (
    <StyledEmptyComponent>
      {isBookmark ? (
        <StyledBookmarkEmpty>
          <img src={BookMarkEmptyImage} alt="북마크 데이터 없음" />
          <p>아직 저장한 북마크 내역이 없어요</p>
        </StyledBookmarkEmpty>
      ) : (
        <StyledLastEmpty>
          <img src={LastEmptyImage} alt="지난 테스트 내역 데이터 없음" />
          <p>아직 풀이한 테스트 내역이 없어요</p>
          <button onClick={handleNavigateToQuestionSelect}>
            테스트하러가기
            <img src={ArrowRightIcon} alt="테스트하러가기" />
          </button>
        </StyledLastEmpty>
      )}
    </StyledEmptyComponent>
  );

  return (
    <StyledContainer>
      <div>
        <strong className="notranslate">{title}</strong>
        {isEmpty ? null : <button onClick={handleMoreClick}>more &gt;</button>}
      </div>
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <StyledTable>
          <StyledTableHead>
            <tr>
              <th>Lv</th>
              <th>Title</th>
              <th>{isBookmark ? "Added Date" : "Created Date"}</th>
            </tr>
          </StyledTableHead>
          <StyledTableBody>
            {data.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item)}>
                <td>
                  {[...Array(item.level)].map((_, i) => (
                    <img key={i} src={StarPixel} alt="레벨" />
                  ))}
                </td>
                <td>
                  <span className="notranslate">#{String(item.problemId).padStart(4, "0")}</span>
                  <strong>{item.title}</strong>
                </td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </StyledTableBody>
        </StyledTable>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.article`
  border: 1px solid #d1d1d1;
  border-radius: 1.25rem;
  background-color: #fafafa;
  padding: 1.875rem 2.1875rem 1.75rem;
  width: 26.25rem;
  height: 16.4375rem;

  @media only screen and (max-width: 480px) {
    border: none;
    background-color: #ffffff;
    padding: 0;
    width: fit-content;
    height: unset;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.875rem;
    @media only screen and (max-width: 480px) {
      padding: 0.8125rem 0;
      margin-bottom: 0.9375rem;
    }
  }

  & > div > strong {
    font-family: var(--font--Galmuri);
    font-size: 1.125rem;
    font-weight: bold;
    color: var(--black-color);
  }

  & > div > button {
    font-size: 0.75rem;
    color: #bdbdbd;
    cursor: pointer;
  }
`;

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTableHead = styled.thead`
  & > tr > th {
    color: var(--secondary-color);
    border-bottom: 1px solid var(--gray200-color);
    font-family: var(--font--Galmuri);
    font-weight: bold;
    font-size: 0.625rem;
    text-align: left;
    padding: 0.375rem 0;

    &:first-of-type {
      padding-left: 0.375rem;
      padding-right: 3.125rem;
    }
    &:nth-of-type(2) {
      padding-right: 11.4375rem;
      @media only screen and (max-width: 480px) {
        padding-right: 10.5rem;
      }
    }
  }
`;

const StyledTableBody = styled.tbody`
  color: var(--black-color);
  font-family: var(--font-Pretendard);

  & > tr {
    border-bottom: 1px solid var(--gray200-color);
    background-color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    &:nth-of-type(even) {
      background-color: #f4f4f4;
      &:hover {
        background-color: #ececec;
      }
    }
  }

  & > tr > td {
    &:first-of-type {
      & img {
        vertical-align: middle;
      }
      padding-left: 0.25rem;
      color: var(--secondary-color);
    }
    &:nth-of-type(2) {
      display: flex;
      align-items: center;

      & span {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray400-color);
        margin-right: 0.75rem;
      }

      & strong,
      font {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--black-color);
        width: 9.5625rem;
        line-height: 2.125rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media only screen and (max-width: 480px) {
          width: 8.5rem;
        }
      }
    }
    &:nth-of-type(3) {
      font-size: 0.75rem;
      font-weight: 400;
      color: #9f9f9f;
    }
  }
`;

const StyledEmptyComponent = styled.div`
  width: 21.875rem;
  height: 9.875rem;
  background-color: #f4f4f4;
  border-radius: 10px;
`;

const StyledBookmarkEmpty = styled.div`
  margin: 0 auto;
  text-align: center;
  & p {
    margin-top: 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray700-color);
  }
`;

const StyledLastEmpty = styled.div`
  margin: 0 auto;
  text-align: center;

  & p {
    margin-top: 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray700-color);
  }
  & > button {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 0.625rem;
    padding: 0.3125rem;
    color: #000000;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;

    & > img {
      transition: fill 0.2s;
      margin: 0.0625rem 0 0 0.125rem;
    }
    &:hover,
    & > img:hover {
      color: var(--point-color);
      filter: brightness(0) saturate(100%) invert(43%) sepia(85%) saturate(1352%) hue-rotate(80deg) brightness(119%)
        contrast(89%);
    }
  }
`;
