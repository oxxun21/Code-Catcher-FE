import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoginCookie } from "../utils/loginCookie.ts";
import styled from "@emotion/styled";
import { Header, GalmuriButton, HelmetMetaTags } from "../components";
import { UserCard } from "../components";
import { metaData } from "../meta/metaData.ts";
import { useCookies } from "react-cookie";

export const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["googtrans"]);
  const isGoogTransEn = cookies.googtrans === "/ko/en";

  useEffect(() => {
    const token = getLoginCookie();
    if (!token) {
      navigate("/splash");
    }
  }, [navigate]);

  return (
    <>
      <HelmetMetaTags meta={metaData.home} />
      <Header />
      <StyledMain>
        <strong className="notranslate">START TEST . . .</strong>
        <UserCard />
        <StyledGalmuriButton
          as={Link}
          to="question/select"
          text={isGoogTransEn ? "Start Today's Test" : "오늘의 코테 시작하기"}
        />
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

  @media only screen and (max-width: 480px) {
    justify-content: unset;
    & > div {
      position: absolute;
      top: 686px;
    }
  }

  & > strong {
    font-family: var(--font--Galmuri);
    font-weight: bold;
    font-size: 1.25rem;
    color: var(--black-color);

    @media only screen and (max-width: 480px) {
      position: absolute;
      visibility: hidden;
    }
  }

  & > article {
    margin: 1.875rem 0 5.0625rem;
    @media only screen and (max-width: 480px) {
      margin: 2.5rem 2.6875rem 10.125rem;
    }
  }
`;

const StyledGalmuriButton = styled(GalmuriButton)`
  @media only screen and (max-width: 480px) {
    position: absolute;
    visibility: hidden;
  }
`;
