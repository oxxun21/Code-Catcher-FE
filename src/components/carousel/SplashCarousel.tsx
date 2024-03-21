import { useEffect, Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import * as images from "../../assets/carousel";
import arrowNext from "../../assets/arrow_slide_next.svg";
import arrowPrev from "../../assets/arrow_slide_prev.svg";

const carouselData = [
  {
    title: "초보자도 쉽게 하는\n코딩 테스트",
    desc: "하루 딱 세 문제, 코딩 테스트 연습하고\n나만의 캐릭터를 키워봐요!",
    imgUrl: images.carouselImg1,
  },
  {
    title: "맞춤 설문을 통해\n문제 난이도를 설정해요",
    desc: "나의 레벨에 맞는 문제를 받기 위해\n10초만 투자해보세요!",
    imgUrl: images.carouselImg2,
  },
  {
    title: "하루에 세문제!\n습관처럼 풀어보세요",
    desc: "로그인이 완료되었다면 세 문제 중 한 문제를 골라\n오늘의 코딩 테스트를 시작해주세요.",
    imgUrl: images.carouselImg3,
  },
  {
    title: "GPT 답안과\n비교해보세요",
    desc: "GPT 답안과 비교해 나의 정답을 확인하면서\n오늘도 한 단계 성장한 자신을 느껴보세요!",
    imgUrl: images.carouselImg4,
  },
];

interface SplashCarouselProps {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}

export const SplashCarousel = ({ currentSlide, setCurrentSlide }: SplashCarouselProps) => {
  const totalSlides = carouselData.length;

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <StyledCarousel style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {carouselData.map((slide, index) => (
          <Slide key={index}>
            <div>
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>

            <img src={slide.imgUrl} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </StyledCarousel>
      <CarouselControls>
        <button onClick={prevSlide}>
          <img src={arrowPrev} alt="이전 슬라이드" />
        </button>
        <span>
          {currentSlide + 1} / {totalSlides}
        </span>
        <button onClick={nextSlide}>
          <img src={arrowNext} alt="다음 슬라이드" />
        </button>
      </CarouselControls>
    </>
  );
};

const StyledCarousel = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  margin: auto;

  @media (max-width: 768px) {
    max-width: none;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: center;
  gap: 20px;
  min-height: 300px;
  overflow: hidden;

  & > div {
    flex: 1;
    min-width: fit-content;
  }

  & h2 {
    width: fit-content;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    color: #222222;
    line-height: 130%;
  }

  & p {
    width: fit-content;
    font-size: 1rem;
    white-space: pre-wrap;
    color: #545454;
    line-height: 156%;
  }

  & img {
    max-width: 400px;
    height: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: rgba(34, 34, 34, 0.2);
  border-radius: 799.2px;
  width: 100px;
  height: 35px;

  button {
    border: none;
    background: none;
    color: #222222;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #ddd;
    }
  }

  span {
    margin: 0 10px;
    font-size: 14px;
    color: #222222;
  }

  @media (max-width: 768px) {
    top: -20%;
    transform: translateX(-50%);
    left: 50%;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
