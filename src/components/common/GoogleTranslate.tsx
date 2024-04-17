import { useEffect, useRef } from "react";
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

export const GoogleTranslate = () => {
  const translateElementRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) <= 480;
  const [cookies, setCookie] = useCookies(["googtrans"]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new (window.google as any).translate.TranslateElement(
        { pageLanguage: "ko", autoDisplay: true },
        translateElementRef.current?.id
      );
    };
    if (!window.google || !window.google.translate) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // 언어 변경 처리
  const handleLanguageChange = (lang: String) => {
    setCookie("googtrans", `/${lang}`, { path: "/" });
    window.location.reload();
  };

  const isGoogTransKo = cookies.googtrans === "/ko";

  return (
    <div>
      <div ref={translateElementRef} id="google_translate_element" style={{ display: "none" }}></div>
      <ul className="translation-links">
        {isGoogTransKo ? (
          <li>
            <a onClick={() => handleLanguageChange("en")}>
              <img src={FlagEn} alt="English" />
              {isMobile && <p>ENG</p>}
            </a>
          </li>
        ) : (
          <li>
            <a onClick={() => handleLanguageChange("ko")}>
              <img src={FlagKo} alt="Korean" />
              {isMobile && <p>KOR</p>}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
