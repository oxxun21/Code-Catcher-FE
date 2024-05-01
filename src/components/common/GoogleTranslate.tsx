import { useEffect, useRef, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import FlagEn from "../../assets/flag_en.svg";
import FlagKo from "../../assets/flag_ko.svg";
import { useWindowSize } from "../../hook";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit?: () => void;
  }
}

export const GoogleTranslate = memo(() => {
  const translateElementRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) <= 480;
  const [cookies] = useCookies(["googtrans"]);
  const [translateWidgetLoaded, setTranslateWidgetLoaded] = useState(false);
  const [isGoogTransKo, setIsGoogTransKo] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const scriptId = "google-translate-script";
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (translateElementRef.current) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "ko", autoDisplay: true },
          translateElementRef.current?.id
        );
      }
      setTranslateWidgetLoaded(true);
    };

    script.onload = () => setTranslateWidgetLoaded(true);
    script.onerror = () => setTranslateWidgetLoaded(false);

    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, [location]);

  useEffect(() => {
    if (translateWidgetLoaded) {
      const currentLang = cookies.googtrans === "/ko/en" ? "en" : "ko";
      refreshTranslateElement(currentLang);
    }
  }, [translateWidgetLoaded, cookies.googtrans]);

  const refreshTranslateElement = (langCode: string) => {
    console.log("[langCode]", langCode);
    const gtcombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (!gtcombo) {
      console.log("Waiting for gtcombo to be available...");
      setTimeout(() => refreshTranslateElement(langCode), 500);
      return;
    }

    gtcombo.value = langCode; // 변경할 언어 적용
    gtcombo.dispatchEvent(new Event("change")); // 변경 이벤트 트리거
    setIsGoogTransKo(langCode === "ko");

    console.log("[gtCombo]", gtcombo.value);
  };

  return (
    <div>
      <div ref={translateElementRef} id="google_translate_element" style={{ display: "none" }}></div>
      <ul className="translation-links">
        {isGoogTransKo ? (
          <li>
            <a onClick={() => refreshTranslateElement("en")}>
              <img src={FlagEn} alt="English" />
              {isMobile && <p>ENG</p>}
            </a>
          </li>
        ) : (
          <li>
            <a onClick={() => refreshTranslateElement("ko")}>
              <img src={FlagKo} alt="Korean" />
              {isMobile && <p>KOR</p>}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
});