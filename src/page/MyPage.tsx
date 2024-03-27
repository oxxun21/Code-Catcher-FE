import styled from "@emotion/styled";
import { UserCard, MypageList, GalmuriButton, MonthlyAchieve, Header, HelmetMetaTags } from "../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPageInfoAPI } from "../api";
import { MyPageInfo_I } from "../interface";
import { metaData } from "../meta/metaData.ts";

export const MyPage = ({}) => {
  const [myInfo, setMyInfo] = useState<MyPageInfo_I>({
    bookmarkInfo: [],
    problemInfo: [],
    achieveInfo: [],
  });

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
  console.log("이거 useState myInfo임", myInfo);
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
        <GalmuriButton as={Link} to="/question/select" text="오늘의 코테 시작하기" />
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

  & > section {
    display: flex;
    gap: 2.1875rem;
    margin-bottom: 4.875rem;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 1.3125rem;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
    justify-content: flex-start;
  }
`;
