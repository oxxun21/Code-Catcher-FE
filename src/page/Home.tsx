import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/loginCookie";
import { useUserStore } from "../stores/useUserStore";
import styled from "@emotion/styled";
import { Header } from "../components";
import { UserCard } from "../components";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLoginCookie();
    if (!token) {
      navigate("/splash");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <StyledMain>
        <UserCard />
      </StyledMain>
    </>
  );
};
const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
