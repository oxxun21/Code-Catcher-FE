import { useEffect, useState } from "react";

interface WindowSize {
  windowWidth: number | undefined;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
