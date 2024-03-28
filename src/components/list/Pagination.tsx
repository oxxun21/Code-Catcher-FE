import styled from "@emotion/styled";
import { useState } from "react";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps) => {
  const [pageGroup, setPageGroup] = useState(Math.floor(currentPage / 5));
  const maxPageGroup = Math.ceil(totalPage / 5) - 1;

  const handleNextGroup = () => {
    if (pageGroup < maxPageGroup) {
      setPageGroup(pageGroup + 1);
      onPageChange(pageGroup * 5 + 5); // 다음 그룹의 첫 페이지로 이동
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const newPageGroup = pageGroup - 1;
      setPageGroup(newPageGroup);
      onPageChange(newPageGroup * 5); // 이전 그룹의 첫 페이지로 이동
    }
  };
  // 현재 페이지 그룹에 따라 표시할 페이지 번호들을 계산
  const startPage = pageGroup * 5 + 1;
  const endPage = Math.max(Math.min(startPage + 4, totalPage), 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const showBackButton = totalPage > 5;
  const showNextButton = totalPage > 5;

  return (
    <StyledNav>
      {showBackButton && (
        <button onClick={handlePrevGroup} disabled={pageGroup === 0}>
          BACK
        </button>
      )}
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <StyledButton onClick={() => onPageChange(number - 1)} isCurrent={number === currentPage + 1}>
              {number}
            </StyledButton>
          </li>
        ))}
      </ul>
      {showNextButton && (
        <button onClick={handleNextGroup} disabled={pageGroup === maxPageGroup}>
          NEXT
        </button>
      )}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  margin-top: 1.875rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > button {
    padding: 0;
    font-weight: 500;
    cursor: pointer;
    color: var(--black-color);

    &:first-of-type {
      margin-right: 0.875rem;
    }
    &:last-of-type {
      margin-left: 0.875rem;
    }
    &:hover {
      color: var(--main-color);
    }
    &:disabled {
      color: #bdbdbd;
    }
  }
  & ul {
    display: flex;
    font-size: 0.75rem;
    li:not(:last-of-type) button {
      margin-right: 9px;
    }
  }
`;

const StyledButton = styled.button<{ isCurrent: boolean }>`
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ isCurrent }) => (isCurrent ? "#ffffff" : "#000000")};
  background-color: ${({ isCurrent }) => (isCurrent ? "var(--main-color)" : "transparent")};
  &:hover {
    background-color: ${({ isCurrent }) => (isCurrent ? "var(--main-color)" : "var(--light-color)")};
  }
`;
