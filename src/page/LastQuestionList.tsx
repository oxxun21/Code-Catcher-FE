import { useState, useEffect } from "react";
import { ProblemListAll_I, ProblemInfo_I } from "../interface";
import { getLastQuestionListAPI } from "../api";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import StarPixel from "../assets/star_pixel.svg";
import { Pagination } from "../components/list/Pagination";
import { Header, HelmetMetaTags } from "../components";
import { metaData } from "../meta/metaData";
import { useEventTracker } from "../hook";
import { useCookies } from "react-cookie";

export const LastQuestionList = () => {
  const [data, setData] = useState<ProblemListAll_I | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(data?.currentPage || 0);
  const trackEvent = useEventTracker();

  const [cookies] = useCookies(["googtrans"]);
  const isGoogTransEn = cookies.googtrans === "/ko/en";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getLastQuestionListAPI(currentPage);
        setData(data);
      } catch (error) {
        console.error("지난 테스트 내역 불러오기 실패", error);
      }
    };

    fetchQuestions();
  }, [currentPage]);

  const totalPage = data?.totalPage || 0;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();
  const handleItemClick = (item: ProblemInfo_I) => {
    trackEvent({
      category: "LastQuestionLis",
      action: "lastQuestionItemClicked",
      label: `문제Id:${item.problemId}`,
    });
    navigate(`/codingTest/${item.problemId}`);
  };

  const getStatus = (status: boolean | null | undefined) => {
    if (status === true) {
      return {
        text: "Complete",
        textColor: "var(--black-color)",
        indicatorColor: "var(--system-positivie-color)",
      };
    } else if (status === false) {
      return {
        text: "Failed",
        textColor: "var(--black-color)",
        indicatorColor: "var(--system-negative-color)",
      };
    } else {
      return {
        text: "No recorded",
        textColor: "#BDBDBD",
        indicatorColor: "var(--gray200-color)",
      };
    }
  };

  return (
    <>
      <HelmetMetaTags meta={metaData.lastQuestion} />
      <Header />
      <StyledMain>
        <section>
          <div>
            <h2 className="notranslate">{isGoogTransEn ? "Test History" : "지난 테스트 내역"}</h2>
            <p>
              지난 한 달 간의 모든 테스트 내역이 표시됩니다. 지난 테스트는 다시 풀 수 있지만, 경험치에 반영되지
              않습니다.
            </p>
          </div>
          <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Lv</th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Created Date</th>
                  <th>status</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {data?.questionData.map((item, index) => {
                  const { text, textColor, indicatorColor } = getStatus(item.status ?? null);
                  return (
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
                      <td>{item.subject}</td>
                      <td>{item.createdAt}</td>
                      <td style={{ color: textColor }}>
                        <StatusIndicator status={!!item.status} style={{ backgroundColor: indicatorColor }} />
                        {text}
                      </td>
                    </tr>
                  );
                })}
              </StyledTableBody>
            </StyledTable>
          </div>
          <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
        </section>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: calc(100vh - 6.25rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > section {
    position: relative;
    background-color: #fff;
    color: #000;
    margin: 20px;

    & > div:nth-of-type(1) {
      position: relative;
      height: 5.625rem;
      & > h2 {
        font-family: var(--font--Galmuri);
        font-size: 1.25rem;
        color: var(--black-color);
        font-weight: bold;
      }
      & > p {
        margin-top: 1rem;
        font-family: var(--font--Pretendard);
        font-size: 0.875rem;
        color: #898989;
        font-weight: 500;
        white-space: pre-wrap;
        word-break: keep-all;
      }
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  white-space: nowrap;
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
    width: auto;
    &:nth-of-type(1) {
      padding-left: 1rem;
      width: 5.625rem;
    }
    &:nth-of-type(2) {
      width: 22.8125rem;
    }
    &:nth-of-type(3) {
      width: 38.875rem;
    }
    &:nth-of-type(4) {
      width: 7.25rem;
    }
    &:nth-of-type(5) {
      width: 5.125rem;
    }
  }
`;
const StyledTableBody = styled.tbody`
  color: var(--black-color);
  font-family: var(--font-Pretendard);

  & > tr {
    border-bottom: 1px solid var(--gray200-color);
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
    padding: 0.625rem 0;
    color: var(--black-color);
    &:nth-of-type(1) {
      min-width: 3rem;
      & img {
        vertical-align: middle;
      }
      padding-right: 1.75rem;
      padding-left: 0.875rem;
      color: var(--secondary-color);
    }
    &:nth-of-type(2) {
      width: 22rem;
      padding-right: 0.75rem;

      & span {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray400-color);
        margin-right: 1.25rem;
      }

      & strong {
        vertical-align: middle;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--black-color);
        line-height: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &:nth-of-type(3) {
      padding-right: 1.25rem;

      font-size: 0.875rem;
      font-weight: 400;
    }
    &:nth-of-type(4) {
      padding-right: 1.875rem;
      width: 5rem;
      font-size: 0.75rem;
      font-weight: 400;
      color: #9f9f9f;
    }
    &:nth-of-type(5) {
      padding-right: 0.625rem;
      display: flex;
      justify-content: left;
      align-items: center;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
`;

const StatusIndicator = styled.div<{ status: boolean }>`
  margin-right: 0.375rem;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 999px;
  background-color: ${({ status }) =>
    status === true
      ? "var(--system-positivie-color)"
      : status === false
      ? "var(--system-negative-color)"
      : "var(--gray200-color)"};
`;
