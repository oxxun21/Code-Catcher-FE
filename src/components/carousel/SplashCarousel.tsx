import { useEffect, Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import * as images from "../../assets/carousel";
import arrowNext from "../../assets/arrow_slide_next.svg";
import arrowPrev from "../../assets/arrow_slide_prev.svg";

const carouselData = [
  {
    title: "초보자도 쉽게 하는\n코딩 테스트",
    desc: "개발 입문자도 쉽게 풀 수 있는 수준의\n다양한 문제를 만나보실 수 있어요.",
    imgUrl: images.carouselImg1,
  },
  {
    title: "하루 3문제!\n습관처럼 풀어보세요",
    desc: "매일 세 문제씩, AI가 추천하는 문제로\n규칙적인 코딩 루틴을 만들어봐요.",
    imgUrl: images.carouselImg2,
  },
  {
    title: "문제를 맞추고\n코디를 키워보세요",
    desc: "정답을 맞출 때마다 쌓이는 경험치로\n코디의 개발 레벨을 올려봐요.",
    imgUrl: images.carouselImg3,
  },
  {
    title: "AI 코드와\n비교해보세요",
    desc: "AI가 제공하는 코드와 피드백을 통해\n오늘도 한 단계 성장한 자신을 느껴보세요!",
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
          <span>{currentSlide + 1}</span> / <span>{totalSlides}</span>
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
  text-align: left;
  justify-content: center;
  gap: 20px;
  min-height: 300px;
  overflow: hidden;

  & > div {
    flex: 1;
    min-width: fit-content;
    margin-top: 165px;
  }

  & h2 {
    width: fit-content;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    color: var(--black-color);
    line-height: 130%;
  }

  & p {
    width: fit-content;
    font-size: 1rem;
    white-space: pre-wrap;
    color: var(--gray700-color);
    line-height: 156%;
  }

  & img {
    max-width: 580px;
    height: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 6.25rem;
  background-color: rgba(34, 34, 34, 0.1);
  border-radius: 799.2px;
  width: 100px;
  height: 35px;

  button {
    border: none;
    background: none;
    color: var(--black-color);
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #ddd;
    }
  }

  & > span {
    margin: 0 10px;
    font-size: 14px;
    color: var(--black-color);
    & > span:nth-of-type(1) {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    top: 1.875rem;
    transform: translateX(-50%);
    left: 50%;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
