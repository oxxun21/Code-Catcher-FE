import styled from "@emotion/styled";
import loading_dot from "../../assets/loading_dot.gif";

export const Loading = () => {
  return (
    <LoadingComponent>
      <span>Loading</span>
      <img src={loading_dot} alt="로딩 화면" />
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font--Galmuri);
  color: var(--point-color);
  font-size: 2.25rem;
  font-weight: 600;
  & > img {
    margin-top: 35px;
  }
`;
