import { MetaData_I } from "../interface";
import * as images from "../assets/meta";

export const metaData: { [key: string]: MetaData_I } = {
  app: {
    title: "코디 Codee",
    description:
      "코디(Codee)는 캐릭터를 성장시키며 코딩 테스트 습관을 기를 수 있는 서비스입니다. 매일 새로운 문제를 통해 프로그래밍 능력을 향상시킬 수 있습니다.",
    image: images.Home,
    url: "https://likelion-codee.com",
  },
  splash: {
    title: "온보딩 | 코디 Codee",
    description:
      "코디(Codee) 온보딩 페이지. 서비스에 대한 설명을 확인할 수 있고 로그인하여 서비스를 시작할 수 있습니다.",
    image: "https://likelion-codee.com/assets/meta/Home.png",
    url: "https://likelion-codee.com",
  },
  home: {
    title: "홈페이지 | 코디 Codee",
    description: "코디(Codee) 홈페이지. 유저 정보를 확인할 수 있고 오늘의 코딩테스트를 하러 갈 수 있습니다.",
    image: images.Home,
    url: "https://likelion-codee.com",
  },
  bookmark: {
    title: "북마크 페이지 | 코디 Codee",
    description: "코디(Codee) 북마크 리스트 페이지. 유저가 북마크한 코딩 테스트 문제들을 확인할 수 있습니다.",
    image: images.Bookmark,
    url: "https://likelion-codee.com/bookmarkList",
  },
  lastQuestion: {
    title: "지난 테스트 내역 페이지 | 코디 Codee",
    description: "코디(Codee) 지난 테스트 내역 리스트 페이지. 지난 코딩 테스트 문제들을 확인할 수 있습니다.",
    image: images.LastQuestion,
    url: "https://likelion-codee.com/lastQuestionList",
  },
  questionSelect: {
    title: "문제 선택 페이지 | 코디 Codee",
    description: "코디(Codee) 문제 선택 페이지. 오늘 코딩 테스트 문제의 정보를 미리 확인하고 선택할 수 있습니다.",
    image: images.QuestionSelect,
    url: "https://likelion-codee.com/question/select",
  },
  codingTest: {
    title: "코딩 테스트 페이지 | 코디 Codee",
    description: "코디(Codee) 코딩 테스트 페이지. 선택한 코딩 테스트 문제를 풀 수 있습니다.",
    image: images.CodingTest,
    url: "https://likelion-codee.com/codingTest/",
  },
  myPage: {
    title: "마이 페이지 | 코디 Codee",
    description:
      "코디(Codee) 마이 페이지. 유저의 경험치 및 북마크 리스트, 지난 테스트 내역, 월간 달성률을 확인할 수 있습니다.",
    image: images.MyPage,
    url: "https://likelion-codee.com/myPage",
  },
};
