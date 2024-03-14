import styled from "@emotion/styled";
import { UserCard, MypageList, GalmuriButton } from "../components";
import { Link } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    title: "두 수의 차",
    level: 1,
    date: "2024.02.05",
  },
  {
    id: 2,
    title: "미로 주행 테스트",
    level: 2,
    date: "2023.01.02",
  },
  {
    id: 3,
    title: "몫 구하기",
    level: 3,
    date: "2019.05.12",
  },
];

const lastData = [
  {
    id: 3,
    title: "두 수의 차",
    level: 1,
    date: "2025.02.03",
  },
  {
    id: 2,
    title: "미로 주행 테스트",
    level: 2,
    date: "2025.02.03",
  },
  {
    id: 2,
    title: "몫 구하기",
    level: 3,
    date: "2025.02.03",
  },
];

export const MyPage = ({}) => {
  return (
    <StyledMain>
      <UserCard />
      <div>
        <MypageList data={dummyData} listType="bookmark" />
        <MypageList data={lastData} listType="lastTests" />
      </div>
      <StyledGalmuriButton as={Link} to="CodingTest/select" text="오늘의 코테 시작하기" />
    </StyledMain>
  );
};

const StyledMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.1875rem;
  position: relative;
  background-color: #ffffff;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.3125rem;
  }
`;

const StyledGalmuriButton = styled(GalmuriButton)`
  position: absolute;
  bottom: 9.5625rem;
`;
