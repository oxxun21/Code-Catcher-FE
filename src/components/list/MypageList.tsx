import styled from "@emotion/styled";
import StarPixel from "../../assets/star_pixel.svg";
import { MyPageListItem } from "../../interface";
import { useNavigate } from "react-router-dom";

type ListType = "bookmark" | "lastTests";

interface MyPageListProps {
  listType: ListType;
  data: MyPageListItem[];
}

export const MypageList = ({ listType, data }: MyPageListProps) => {
  const title = listType === "bookmark" ? "북마크" : "지난 테스트 내역";

  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    const routePrefix = listType === "bookmark" ? "/bookmark/" : "/last/";
    navigate(`${routePrefix}${id}`);
  };

  return (
    <StyledContainer>
      <div>
        <strong>{title}</strong>
        <button>more &gt;</button>
      </div>
      <StyledTable>
        <StyledTableHead>
          <tr>
            <th>Lv</th>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </StyledTableHead>
        <StyledTableBody>
          {data.map(data => (
            <tr key={data.id} onClick={() => handleItemClick(data.id)}>
              <td>
                {[...Array(data.level)].map((_, index) => (
                  <img key={index} src={StarPixel} alt="레벨" />
                ))}
              </td>
              <td>
                <span>#{String(data.id).padStart(4, "0")}</span> {data.title}
              </td>
              <td>{data.date}</td>
            </tr>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledContainer>
  );
};

const StyledContainer = styled.article`
  width: fit-content;
  border: 1px solid #d1d1d1;
  border-radius: 1.25rem;
  background-color: #fafafa;
  padding: 1.875rem 2.1875rem 1.75rem;
  min-height: 16.4375rem;

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
      font-size: 0.875rem;
      font-weight: 600;
      color: #222222;
      & span {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray400-color);
        margin-right: 0.75rem;
      }
    }
    &:nth-child(3) {
      font-size: 0.75rem;
      font-weight: 400;
      color: #9f9f9f;
    }
  }
`;
