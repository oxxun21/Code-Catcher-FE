import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { BookmarkInfo_I, ProblemInfo_I } from "../../interface";
import StarPixel from "../../assets/star_pixel.svg";
import BookMarkEmptyImage from "../../assets/bookmark_empty.svg";
import LastEmptyImage from "../../assets/last_empty.svg";
import ArrowRightIcon from "../../assets/arrow_right_lastTests.svg";

type ListType = "bookmark" | "lastTests";

interface MyPageListProps {
  listType: ListType;
  data: Array<BookmarkInfo_I | ProblemInfo_I>;
}

export const MypageList = ({ listType, data }: MyPageListProps) => {
  const isBookmark = listType === "bookmark";
  const title = isBookmark ? "북마크" : "지난 테스트 내역";

  const navigate = useNavigate();
  const handleItemClick = (item: BookmarkInfo_I | ProblemInfo_I) => {
    const routePrefix = isBookmark ? "/bookmark/" : "/codingTest/";
    const routeId = isBookmark ? (item as BookmarkInfo_I).bookmarkId : (item as ProblemInfo_I).problemId;

    navigate(`${routePrefix}${routeId}`);
  };
  const isEmpty = data.length === 0;
  const EmptyComponent = () => (
    <StyledEmptyComponent>
      {isBookmark ? (
        <StyledBookmarkEmpty>
          <img src={BookMarkEmptyImage} alt="북마크 데이터 없음" />
        </StyledBookmarkEmpty>
      ) : (
        <StyledLastEmpty>
          <img src={LastEmptyImage} alt="지난 테스트 내역 데이터 없음" />
          <button onClick={() => navigate("/CodingTest/select")}>
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
        <strong>{title}</strong>
        {isEmpty ? null : (
          <button onClick={() => navigate(isBookmark ? "/bookmarkList" : "/lastQuestionList")}>more &gt;</button>
        )}
      </div>
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <StyledTable>
          <StyledTableHead>
            <tr>
              <th>Lv</th>
              <th>Title</th>
              <th>Date</th>
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
                  <span>#{String(item.problemId).padStart(4, "0")}</span>
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

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.875rem;
  }

  & > div > strong {
    font-family: var(--font--Galmuri);
    font-size: 1.125rem;
    font-weight: bold;
    color: #222222;
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
    color: #192e47;
    border-bottom: 1px solid #dbdbdb;
    font-family: var(--font-Galmuri);
    font-weight: bold;
    font-size: 0.625rem;
    text-align: left;
    padding: 0.375rem 0;

    &:first-child {
      padding-left: 0.375rem;
      padding-right: 3.125rem;
    }
    &:nth-child(2) {
      padding-right: 11.4375rem;
    }
    &:nth-child(3) {
      padding-right: 3rem;
    }
  }
`;

const StyledTableBody = styled.tbody`
  color: #222222;
  font-family: var(--font-Pretendard);

  & > tr {
    border-bottom: 1px solid #dbdbdb;
    cursor: pointer;
    &:nth-child(even) {
      background-color: #f4f4f4;
    }
  }

  & > tr > td {
    padding: 0.5rem 0;

    &:first-child {
      & img {
        vertical-align: middle;
      }
      padding-left: 0.25rem;
      color: #192e47;
    }
    &:nth-child(2) {
      display: flex;
      & span {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray400-color);
        margin-right: 0.75rem;
      }

      & strong {
        font-size: 0.875rem;
        font-weight: 600;
        color: #222222;
        width: 9.5625rem;
        line-height: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &:nth-child(3) {
      font-size: 0.75rem;
      font-weight: 400;
      color: #9f9f9f;
    }
  }
`;

const StyledEmptyComponent = styled.div`
  width: 21.875rem;
  height: 9.875rem;
  background-color: #eeeeee;
`;

const StyledBookmarkEmpty = styled.div`
  margin: 0 auto;
`;

const StyledLastEmpty = styled.div`
  margin: 0 auto;
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
      color: var(--light-color);
      filter: brightness(0) saturate(100%) invert(43%) sepia(85%) saturate(1352%) hue-rotate(80deg) brightness(119%)
        contrast(89%);
    }
  }
`;
