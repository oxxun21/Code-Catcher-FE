import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (gaTrackingId) {
      ReactGA.initialize(gaTrackingId);
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location]);

  return null;
};
