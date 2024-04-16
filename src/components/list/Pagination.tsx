import styled from "@emotion/styled";
import { useState } from "react";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps) => {
  const pageGroupSize = 5;
  const [pageGroup, setPageGroup] = useState(Math.floor(currentPage / pageGroupSize));
  const maxPageGroup = Math.ceil((totalPage + 1) / pageGroupSize) - 1;

  const handlePageGroupChange = (direction: "next" | "prev") => {
    setPageGroup(currentGroup => {
      const newPageGroup = direction === "next" ? currentGroup + 1 : currentGroup - 1;
      onPageChange(
        direction === "next" ? currentGroup * pageGroupSize + pageGroupSize - 1 : newPageGroup * pageGroupSize
      );
      return newPageGroup;
    });
  };
  // 현재 페이지 그룹에 따라 표시할 페이지 번호들을 계산
  const startPage = pageGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage + 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const showBackButton = totalPage >= 5;
  const showNextButton = totalPage >= 5;

  return (
    <StyledNav>
      {showBackButton && (
        <button onClick={() => handlePageGroupChange("prev")} disabled={pageGroup === 0}>
          BACK
        </button>
      )}
      <ul className="notranslate">
        {pageNumbers.map(number => (
          <li key={number}>
            <StyledButton onClick={() => onPageChange(number - 1)} isCurrent={number === currentPage + 1}>
              {number}
            </StyledButton>
          </li>
        ))}
      </ul>
      {showNextButton && (
        <button onClick={() => handlePageGroupChange("next")} disabled={pageGroup === maxPageGroup}>
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
