import { useState, useEffect } from "react";
import { BookmarkListAll_I, BookmarkInfo_I } from "../interface";
import { deleteBookmarkManyAPI, getBookmarkListAPI } from "../api";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import StarPixel from "../assets/star_pixel.svg";
import CheckedImage from "../assets/checked.svg";
import { Pagination } from "../components/list/Pagination";
import { Header, HelmetMetaTags, Modal } from "../components";
import { metaData } from "../meta/metaData";

export const BookmarkList = () => {
  const [data, setData] = useState<BookmarkListAll_I | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const isAnyChecked = Object.values(checkedItems).some(checked => checked);
  const [currentPage, setCurrentPage] = useState<number>(data?.currentPage || 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getBookmarkListAPI(currentPage);
        setData(data);
      } catch (error) {
        console.error("북마크 불러오기 실패", error);
      }
    };

    fetchQuestions();
  }, [currentPage]);

  const totalPage = data?.totalPage || 0;
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();
  const handleItemClick = (item: BookmarkInfo_I) => {
    navigate(`/bookmark/${item.bookmarkId}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>, bookmarkId: string) => {
    e.stopPropagation();
    setCheckedItems(prev => ({ ...prev, [bookmarkId]: !prev[bookmarkId] }));
  };

  const handleDeleteSelectedBookmarks = async () => {
    const selectedBookmarkIds = Object.keys(checkedItems).filter(key => checkedItems[key]);

    try {
      const resData = await deleteBookmarkManyAPI(currentPage, selectedBookmarkIds);
      if (resData) {
        setData(resData);
        setCheckedItems({});
      } else {
        console.log("삭제 후 데이터를 받지 못했습니다.");
      }
    } catch (error) {
      console.error("북마크 삭제 실패", error);
    }
    closeModal();
  };
  return (
    <>
      <HelmetMetaTags meta={metaData.bookmark} />
      <Header />
      <StyledMain>
        <section>
          <div>
            <h2>북마크</h2>
            <p>내가 저장한 답안의 북마크 목록이 표시됩니다.</p>
            {(data?.questionData?.length ?? 0) > 0 && (
              <DeleteButton onClick={openModal} disabled={!isAnyChecked}>
                삭제
              </DeleteButton>
            )}
            {isModalOpen && (
              <Modal onClose={closeModal} modalHeader="Want to Delete">
                <ModalContents>
                  <strong>북마크 된 내역을 삭제 하시겠어요?</strong>
                  <p>삭제하면 선택된 내역이 사라지며 복구할 수 없습니다.</p>
                  <div>
                    <button onClick={closeModal}>취소</button>
                    <button onClick={handleDeleteSelectedBookmarks}>삭제</button>
                  </div>
                </ModalContents>
              </Modal>
            )}
          </div>
          <StyledTable>
            <StyledTableHead>
              <tr>
                <th>Lv</th>
                <th>Title</th>
                <th>Detail</th>
                <th>Added Date</th>
                <th />
              </tr>
            </StyledTableHead>
            <StyledTableBody>
              {data?.questionData.map((item, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    checked={!!checkedItems[item.bookmarkId]}
                    onClick={() => handleItemClick(item)}
                  >
                    <td>
                      {[...Array(item.level)].map((_, i) => (
                        <img key={i} src={StarPixel} alt="레벨" />
                      ))}
                    </td>
                    <td>
                      <span>#{String(item.problemId).padStart(4, "0")}</span>
                      <strong>{item.title}</strong>
                    </td>
                    <td>{item.subject}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <CheckboxDiv
                        checked={!!checkedItems[item.bookmarkId]}
                        onClick={e => handleCheckboxClick(e, item.bookmarkId)}
                      >
                        {checkedItems[item.bookmarkId] && <Checkmark src={CheckedImage} alt="선택" />}
                      </CheckboxDiv>
                    </td>
                  </StyledTableRow>
                );
              })}
            </StyledTableBody>
          </StyledTable>
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
    min-width: 80rem;
    min-height: 25.125rem;

    & > div {
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
      }
    }
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4.25rem;
  right: 1.25rem;
  padding: 6px 12px;
  color: #ffffff;
  border: none;
  font-size: 0.625rem;
  font-weight: 500;
  background-color: var(--main-color);
  border-radius: 0.125rem;
  cursor: pointer;
  &:disabled {
    color: #bdbdbd;
    border: 1px solid #bdbdbd;
    background-color: #ffffff;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: var(--hover-color);
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  & > strong {
    font-size: 1.375rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  & > p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1.875rem;
  }

  & > div {
    display: flex;
    gap: 20px;

    & button {
      font-size: 1rem;
      font-weight: 500;
      border-radius: 20px;
      padding: 1rem 4.3125rem;
      cursor: pointer;
    }
    & button:nth-child(1) {
      color: var(--black-color);
      border: 2px solid var(--gray200-color);
      background-color: #f4f4f4;
    }
    & button:nth-child(2) {
      color: #ffffff;
      background-color: var(--secondary-color);
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
      padding-right: 3.875rem;
    }
    &:nth-of-type(2) {
      padding-right: 21.25rem;
    }
    &:nth-of-type(3) {
      padding-right: 37.125rem;
      width: 37.75rem;
    }
    &:nth-of-type(4) {
      padding-right: 4.8125rem;
    }
  }
`;
const StyledTableBody = styled.tbody`
  color: var(--black-color);
  font-family: var(--font-Pretendard);
`;

const StyledTableRow = styled.tr<{ checked: boolean }>`
  border-bottom: 1px solid var(--gray200-color);
  cursor: pointer;
  background-color: ${props => (props.checked ? "rgba(50, 205, 50, 0.1)" : "#ffffff")};
  &:hover {
    background-color: ${props => (props.checked ? "rgba(50, 205, 50, 0.1)" : "#f5f5f5")};
  }
  &:nth-child(even) {
    background-color: ${props => (props.checked ? "rgba(50, 205, 50, 0.1)" : "#f4f4f4")};
    &:hover {
      background-color: ${props => (props.checked ? "rgba(50, 205, 50, 0.1)" : "#ececec")};
    }
  }

  & > td {
    padding: 0.625rem 0;
    color: var(--black-color);
    &:nth-child(1) {
      width: 3rem;
      & img {
        vertical-align: middle;
      }
      padding-left: 0.875rem;
      color: var(--secondary-color);
    }
    &:nth-child(2) {
      width: 22rem;

      & span {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray400-color);
        margin-right: 0.75rem;
      }

      & strong {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--black-color);
        line-height: 0.875rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &:nth-child(3) {
      width: 37.75rem;
      font-size: 0.875rem;
      font-weight: 400;
    }
    &:nth-child(4) {
      width: 5rem;
      font-size: 0.75rem;
      font-weight: 400;
      color: #9f9f9f;
    }
    &:nth-child(5) {
      padding: 0.625rem 1.9375rem 0.625rem 4.5625rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const CheckboxDiv = styled.div<{ checked: boolean }>`
  padding: 0.1875rem;
  width: 1rem;
  height: 1rem;
  border: ${({ checked }) => (checked ? "none" : "1px solid #bdbdbd")};
  border-radius: 2px;
  background-color: ${({ checked }) => (checked ? "var(--point-color)" : "transparent")};
  cursor: pointer;
`;
const Checkmark = styled.img`
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
