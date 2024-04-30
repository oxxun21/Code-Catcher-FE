import { useEffect, useRef, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import FlagEn from "../../assets/flag_en.svg";
import FlagKo from "../../assets/flag_ko.svg";
import { useWindowSize } from "../../hook";
import { useCookies } from "react-cookie";

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
  const [cookies, removeCookie] = useCookies(["googtrans"]);
  const [isGoogTransKo, setIsGoogTransKo] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    loadGoogleTranslateScript();
    return () => unloadGoogleTranslateScript();
  }, [location]);

  const loadGoogleTranslateScript = () => {
    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) {
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (translateElementRef.current) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ko",
            autoDisplay: true,
          },
          translateElementRef.current.id
        );
      }
    };

    script.onload = () => {
      setIsGoogTransKo(!(cookies.googtrans && cookies.googtrans === "/ko/en"));
    };
  };

  const unloadGoogleTranslateScript = () => {
    const script = document.getElementById("google-translate-script");
    if (script) {
      document.body.removeChild(script);
    }
    delete window.googleTranslateElementInit;
  };

  const refreshTranslateElement = (langCode: string) => {
    if (langCode === "en") {
      const gtcombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (gtcombo) {
        gtcombo.value = langCode;
        gtcombo.dispatchEvent(new Event("change"));
        setIsGoogTransKo(false);
      } else {
        setTimeout(() => refreshTranslateElement(langCode), 500);
      }
    } else if (langCode === "ko") {
      unloadGoogleTranslateScript();
      removeCookie("googtrans", { path: "/" }, { domain: "likelion-codee.com" });
      window.location.reload();
      setIsGoogTransKo(true);
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
