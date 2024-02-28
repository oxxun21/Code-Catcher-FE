import { CodeEditor } from "../components";
import styled from "@emotion/styled";
import gutter_horizontal from "../assets/gutter_horizontal.svg";
import gutter_vertical from "../assets/gutter_vertical.svg";
import { useDraggable } from "../hook";

export const CodingTest = () => {
  const {
    width: descWidth,
    height: editorHeight,
    startDragHorizontal,
    startDragVertical,
  } = useDraggable({ initialWidth: 40, initialHeight: 60 });

  return (
    <>
      <PageHeader>
        <h2>두 수의 차</h2>
        <span>Lv.1</span>
      </PageHeader>
      <Contain>
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
        <Gutter orientation="horizontal" onMouseDown={startDragHorizontal} />
        <CodeContain style={{ width: `${100 - descWidth}%` }}>
          <CodeEditor editorHeight={editorHeight} />
          {/* 컴포넌트 분리 */}
          <Gutter orientation="vertical" onMouseDown={startDragVertical} />
          <ResultContain style={{ height: `${100 - editorHeight}%` }}>
            <strong>실행 결과</strong>
            <article>실행 결과가 여기에 표시됩니다.</article>
          </ResultContain>
        </CodeContain>
      </Contain>
      <ButtonContain>
        <button disabled>초기화</button>
        <button disabled>코드 실행</button>
        <button>제출 후 채점하기</button>
      </ButtonContain>
    </>
  );
};

const PageHeader = styled.div`
  background-color: #32323a;
  padding: 22px 34px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-color);
  & > h2 {
    font-size: 1.375rem;
    display: inline-block;
    margin-right: 1rem;
  }
  & > span {
    color: var(--gray400-color);
    font-size: 0.875rem;
  }
`;

const Contain = styled.div`
  display: flex;
  background-color: var(--gray500-color);
  height: 81vh;
  position: relative;
`;

const DescSection = styled.section`
  min-width: 30%;
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

const CodeContain = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
`;

const ResultContain = styled.section`
  min-height: 20%;
  & > strong {
    display: block;
    font-size: 0.875rem;
    padding: 0 24px 20px 24px;
    color: var(--gray400-color);
    font-weight: 600;
  }
  & > article {
    border-top: 2px solid var(--background-color);
    padding: 24px;
    color: var(--gray400-color);
    font-size: 0.75rem;
  }
`;

const ButtonContain = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  & > button {
    cursor: pointer;
    padding: 12px 24px;
    font-size: 1rem;
    background-color: #fff;
    color: #000;
    font-weight: 600;
    border-radius: 4px;
    &:disabled {
      background-color: #757575;
    }
  }
`;

const Gutter = styled.div<{ orientation: "vertical" | "horizontal" }>`
  width: ${props => props.orientation === "horizontal" && "24px"};
  height: ${props => props.orientation === "vertical" && "24px"};
  background: ${props =>
    props.orientation === "horizontal"
      ? `url(${gutter_horizontal}) no-repeat center`
      : `url(${gutter_vertical}) no-repeat center`};
  background-size: ${props => (props.orientation === "horizontal" ? "auto/40px" : "40px/auto")};
  border-right: ${props => props.orientation === "horizontal" && "2px solid var(--background-color)"};
  border-top: ${props => props.orientation === "vertical" && "2px solid var(--background-color)"};
  cursor: ${props => (props.orientation === "horizontal" ? "e-resize" : "n-resize")};
`;
