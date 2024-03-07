import styled from "@emotion/styled";
import loading from "../../assets/loading.svg";

export const Loading = () => {
  return (
    <LoadingComponent>
      <img src={loading} alt="로딩 화면" />
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
