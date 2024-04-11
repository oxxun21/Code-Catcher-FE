import { css } from "@emotion/react";
import "react-datepicker/dist/react-datepicker.css";

const datePicker = css`
  .react-datepicker {
    width: 340px;
    padding: 0;
    border-color: transparent;
    background-color: transparent;
  }
  .react-datepicker__month-container {
    border-color: transparent;
    background-color: transparent;
    transition: transform 0.3s ease-out;
  }
  .react-datepicker__day--outside-month {
    cursor: default;
    visibility: hidden;
  }

  .react-datepicker__header {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  .react-datepicker__navigation {
    line-height: 1.5rem;
  }
  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    visibility: hidden;
  }
  .react-datepicker__navigation--previous {
    width: 24px;
    height: 24px;
    background: url("/assets/arrow_left.svg") no-repeat !important;
  }

  .react-datepicker__navigation--next {
    width: 24px;
    height: 24px;
    background: url("/assets/arrow_right.svg") no-repeat !important;
  }

  //yyyy.mm
  .react-datepicker__current-month {
    padding: 0.1875rem 0;
    margin: 0;
    width: 340px;
    margin-bottom: 71px;
    font-family: var(--font--Galmuri);
    font-size: 1.125rem;
    line-height: 1.125rem;
    font-weight: bold;
  }
  //day 컨테이너
  .react-datepicker__month {
    margin: 0;
    width: 340px;
    line-height: 0.875rem;
  }
  //요일 가로
  .react-datepicker__day-names {
    width: 20.3125rem;
    margin: 0 7px;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;

    & div:nth-of-type(6) {
      margin-left: 0.1875rem;
    }
    & div:nth-of-type(7) {
      margin-left: 0.625rem;
    }
  }
  //각 요일
  .react-datepicker__day-name {
    width: fit-content;
    margin: 0;
    font-family: var(--font--Galmuri);
    font-size: 0.875rem;
    line-height: 0.875rem;
    font-weight: bold;
  }
  //day 가로 (week)
  .react-datepicker__week {
    display: flex;
    max-height: 2.5rem;
    margin-bottom: 0.625rem;
    & > div:not(:last-of-type) {
      margin-right: 10px;
    }
  }
  //전체 day
  .react-datepicker__day.react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid var(--gray200-color);
    background-color: #f4f4f4;
    margin: 0;
    font-family: var(--font--Galmuri);
    font-size: 0.9375rem;
    font-weight: bold;
  }
  .react-datepicker__day--disabled {
    pointer-events: none;
  }

  //오늘 day
  .react-datepicker__day--selected.react-datepicker__day--today {
    border: 2px solid var(--gray200-color);
    background-color: #ffffff;
  }

  .react-datepicker__day--cnt-1 {
    background-color: #99ee99 !important;
    color: #ffffff !important;
    border: 1px solid transparent !important;
  }

  .react-datepicker__day--cnt-2 {
    background-color: #44b044 !important;
    color: #ffffff !important;
    border: 1px solid transparent !important;
  }

  .react-datepicker__day--cnt-3 {
    background-color: #076e07 !important;
    color: #ffffff !important;
    border: 1px solid transparent !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--today {
    border: 2px solid var(--gray200-color) !important;
  }
`;

export default datePicker;
