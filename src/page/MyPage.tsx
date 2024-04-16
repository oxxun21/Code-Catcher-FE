import styled from "@emotion/styled";
import { UserCard, MypageList, GalmuriButton, MonthlyAchieve, Header, HelmetMetaTags } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPageInfoAPI } from "../api";
import { MyPageInfo_I } from "../interface";
import { metaData } from "../meta/metaData";
import { useEventTracker } from "../hook";
import { useCookies } from "react-cookie";

export const MyPage = ({}) => {
  const [myInfo, setMyInfo] = useState<MyPageInfo_I>({
    bookmarkInfo: [],
    problemInfo: [],
    achieveInfo: [],
  });

  const navigate = useNavigate();
  const trackEvent = useEventTracker();

  const [cookies] = useCookies(["googtrans"]);

  const isGoogTransEn = cookies.googtrans === "/ko/en";

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyPageInfoAPI();
        if (data) {
          setMyInfo(data);
        }
      } catch (error) {}
    };

    fetchMyInfo();
  }, []);

  const handleNavigateToQuestionSelect = () => {
    trackEvent({
      category: "CodingTest",
      action: "goToQuestionSelect",
    });
    navigate("/question/select");
  };

  return (
    <>
      <HelmetMetaTags meta={metaData.myPage} />
      <Header />
      <StyledMain>
        <section>
          <UserCard />
          <div>
            <MypageList data={myInfo.bookmarkInfo} listType="bookmark" />
            <MypageList data={myInfo.problemInfo} listType="lastTests" />
          </div>
          <MonthlyAchieve data={myInfo.achieveInfo} />
        </section>
        <StyledGalmuriButton
          onClick={handleNavigateToQuestionSelect}
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

  @media (max-width: 1300px) {
    padding: 2rem 1rem;
    justify-content: flex-start;
  }

  @media only screen and (max-width: 480px) {
    padding: 0;
    justify-content: center;
  }

  & > section {
    display: flex;
    gap: 2.1875rem;
    margin-bottom: 4.875rem;

    @media (max-width: 1300px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    @media only screen and (max-width: 480px) {
      padding: 0;
      justify-content: center;
      margin: 1.25rem 1.25rem 4.875rem;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 1.3125rem;

      & > article:nth-of-type(2) {
        @media only screen and (max-width: 480px) {
          position: absolute;
          visibility: hidden;
        }
      }
    }

    & > article:nth-of-type(1) {
      @media only screen and (max-width: 480px) {
        position: absolute;
        visibility: hidden;
      }
    }
  }
`;

const StyledGalmuriButton = styled(GalmuriButton)`
  @media only screen and (max-width: 480px) {
    position: absolute;
    visibility: hidden;
  }
`;
