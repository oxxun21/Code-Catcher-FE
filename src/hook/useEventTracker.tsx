import ReactGA from "react-ga4";

interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const useEventTracker = () => {
  console.log("useEventTracker is initialized");
  const trackEvent = ({ category, action, label, value }: TrackEventParams) => {
    console.log("Event tracked:", { category, action, label, value });
    ReactGA.event({
      category, // 이벤트 카테고리
      action, // 이벤트 액션
      label, // 이벤트 라벨
      value, // 이벤트 값
    });
  };

  return trackEvent;
};
