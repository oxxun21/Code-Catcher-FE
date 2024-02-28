import styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselImage from "../../assets/carousel_dummy_img.png";

const carouselData = [
  {
    title: "초보자도 쉽게 하는\n코딩 테스트",
    desc: "하루 딱 세 문제, 코딩 테스트 연습하고\n나만의 캐릭터를 키워봐요!",
    imgUrl: carouselImage,
  },
  {
    title: "맞춤 설문을 통해\n문제 난이도를 설정해요",
    desc: "나의 레벨에 맞는 문제를 받기 위해\n10초만 투자해보세요!",
    imgUrl: carouselImage,
  },
  {
    title: "하루에 세문제!\n습관처럼 풀어보세요",
    desc: "로그인이 완료되었다면 세 문제 중 한 문제를 골라\n오늘의 코딩 테스트를 시작해주세요.",
    imgUrl: carouselImage,
  },
  {
    title: "GPT 답안과\n비교해보세요",
    desc: "GPT 답안과 비교해 나의 정답을 확인하면서\n오늘도 한 단계 성장한 자신을 느껴보세요!",
    imgUrl: carouselImage,
  },
];

// TODO: 캐러셀 슬라이드 넘길 수 있는 커스텀 버튼 필요
const SplashCarousel = () => {
  return (
    <>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        autoPlay={true}
        transitionTime={400}
        interval={4000}
        infiniteLoop={false}
      >
        {carouselData.map((slide, index) => (
          <StyledCarousel key={index}>
            <div>
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>
            <img src={slide.imgUrl} alt={`Slide${index + 1}`} />
          </StyledCarousel>
        ))}
      </Carousel>
    </>
  );
};

// TODO: 반응형 미디어쿼리 추가필요
const StyledCarousel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    min-width: 400px;
    color: #ffffff;
  }

  & h2 {
    font-size: 32px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 8px;
    white-space: pre-wrap;
  }
  & p {
    font-size: 16px;
    text-align: left;
    white-space: pre-wrap;
  }

  & img {
    max-width: 451px;
  }
`;

export default SplashCarousel;
