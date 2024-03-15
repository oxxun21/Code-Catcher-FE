import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/loginCookie";
import styled from "@emotion/styled";
import { Header, GalmuriButton } from "../components";
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
        <h1>START TEST . . .</h1>
        <UserCard />
        <GalmuriButton as={Link} to="CodingTest/select" text="오늘의 코테 시작하기" />
      </StyledMain>
    </>
  );
};
const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  & > h1 {
    font-family: var(--font-Galmuri);
    font-weight: bold;
    font-size: 1.25rem;
    color: #222222;
  }
  & > article {
    margin: 1.875rem 0 5.0625rem;
  }
`;
