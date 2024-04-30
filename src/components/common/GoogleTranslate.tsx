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

  const resetTranslation = () => {
    if (!document.cookie.includes("googtrans")) {
      return;
    }
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  useEffect(() => {
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      script.onload = () => {
        checkGoogleTranslateLoaded(); // 스크립트 로드 후 구글 번역 API 초기화 확인
      };
      script.onerror = () => {
        setTranslateWidgetLoaded(false);
        console.error("Failed to load the Google Translate script.");
      };
    }
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      delete window.googleTranslateElementInit;
    };
  }, [location]);

  const checkGoogleTranslateLoaded = () => {
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      window.googleTranslateElementInit = () => {
        if (translateElementRef.current) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "ko", autoDisplay: true },
            translateElementRef.current.id
          );
          setTranslateWidgetLoaded(true);
        }
      };
      window.googleTranslateElementInit();
    } else {
      setTimeout(checkGoogleTranslateLoaded, 100); // 100ms 후 다시 확인
    }
  };

  useEffect(() => {
    if (translateWidgetLoaded) {
      const currentLang = cookies.googtrans === "/ko/en" ? "en" : "ko";
      refreshTranslateElement(currentLang);
    }
  }, [translateWidgetLoaded, cookies.googtrans]);

  const refreshTranslateElement = (langCode: string) => {
    console.log("[langCode]", langCode);
    try {
      const gtcombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (langCode === "en") {
        if (gtcombo) {
          gtcombo.value = langCode;
          gtcombo.dispatchEvent(new Event("change"));
          console.log("[gtCombo]", gtcombo.value);
        } else {
          console.log("Waiting for gtcombo to be available...");
          setTimeout(() => refreshTranslateElement(langCode), 500);
        }
      } else if (langCode === "ko") {
        resetTranslation(); // 원본 언어로 리셋
      }
      setIsGoogTransKo(langCode === "ko");
    } catch (error) {
      console.error("Error refreshing the Google Translate element:", error);
    }
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
