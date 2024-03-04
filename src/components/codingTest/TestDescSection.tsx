import styled from "@emotion/styled";

export const TestDescSection = ({ descWidth }: { descWidth: number }) => {
  return (
    <DescSection style={{ width: `${descWidth}%` }}>
      <DescArticle>
        <strong>문제 설명</strong>
        <p>정수 어쩌구랑 어쩌구가 주어질 때, return 구하는 solution 함수를 완성해주세요</p>
      </DescArticle>
      <DescArticle>
        <strong>제한 사항</strong>
        <ul>
          <li>제한 사항 1</li>
          <li>제한 사항 2</li>
        </ul>
      </DescArticle>
      <DescArticle>
        <strong>입출력 예</strong>
        <table>
          <tr>
            <td>1,1</td>
            <td>1,2</td>
            <td>1,3</td>
          </tr>
          <tr>
            <td>2,1</td>
            <td>2,2</td>
            <td>2,3</td>
          </tr>
          <tr>
            <td>3,1</td>
            <td>3,2</td>
            <td>3,3</td>
          </tr>
        </table>
      </DescArticle>
    </DescSection>
  );
};

const DescSection = styled.section`
  padding: 36px 28px;
`;

const DescArticle = styled.article`
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 5rem;
  &:last-of-type {
    margin-bottom: 0;
  }
  & > strong {
    font-weight: 600;
    color: #989898;
    margin-bottom: 1rem;
    display: block;
  }
  & > ul {
    list-style-type: disc;
    padding-inline-start: 16px;
  }
  & > table {
    background-color: #2c2c34;
    & > tr > td {
      font-size: 0.875rem;
      padding: 10px 20px;
      outline: 1px solid #404040;
    }
  }
`;
