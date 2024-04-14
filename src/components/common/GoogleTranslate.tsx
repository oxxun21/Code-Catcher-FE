import React, { useEffect, useRef, useState } from "react";
import FlagEn from "../../assets/flag_en.svg";
import FlagKo from "../../assets/flag_ko.svg";
import { useWindowSize } from "../../hook";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = () => {
  const translateElementRef = useRef<HTMLDivElement>(null);
  const [isEnglishVisible, setIsEnglishVisible] = useState(true);
  const { windowWidth } = useWindowSize();
  const isMobile = (windowWidth ?? 0) <= 480;

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          autoDisplay: true,
        },
        translateElementRef.current?.id
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTranslateClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const lang = event.currentTarget.dataset.lang;
    setIsEnglishVisible(lang === "ko");
    if (lang === "ko") {
      document.cookie = "googtrans=/ko; path=/;";
      window.location.reload();
    } else if (lang) {
      const gtCombo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (gtCombo) {
        gtCombo.value = lang;
        gtCombo.dispatchEvent(new Event("change"));
      }
    }
  };

  return (
    <div>
      <div ref={translateElementRef} id="google_translate_element" style={{ display: "none" }}></div>
      <ul className="translation-links">
        {isEnglishVisible && (
          <li>
            <a href="#" onClick={handleTranslateClick} data-lang="en">
              <img src={FlagEn} alt="영어" />
              {isMobile ? <p>ENG</p> : null}
            </a>
          </li>
        )}
        {!isEnglishVisible && (
          <li>
            <a href="#" onClick={handleTranslateClick} data-lang="ko">
              <img src={FlagKo} alt="한국어" />
              {isMobile ? <p>KOR</p> : null}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default GoogleTranslate;
