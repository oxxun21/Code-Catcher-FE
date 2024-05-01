import { useEffect, useRef, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import FlagEn from "../../assets/flag_en.svg";
import FlagKo from "../../assets/flag_ko.svg";
import { useWindowSize } from "../../hook";
import { useCookies } from "react-cookie";
import { Loading } from "./Loading";

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
  const [loading, setLoading] = useState(false);
  const [isGoogTransKo, setIsGoogTransKo] = useState<boolean>(true);
  const location = useLocation();

  const removeGoogleTransCookies = () => {
    const paths = [
      "/",
      "/bookmark/",
      "/myPage",
      "/bookmarkList",
      "/lastQuestionList",
      "/codingTest/",
      "/codeCompare/",
      "/splash",
      "/question/select",
    ];
    paths.forEach(path => {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
    });

    window.location.reload();
  };

  useEffect(() => {
    loadGoogleTranslateScript();
    return () => unloadGoogleTranslateScript();
  }, [location]);

  const loadGoogleTranslateScript = () => {
    setLoading(true);
    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) {
      setLoading(false);
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
      setLoading(false);
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
        if (!loading) {
          setTimeout(() => refreshTranslateElement(langCode), 500);
        }
      }
    } else if (langCode === "ko") {
      unloadGoogleTranslateScript();
      removeGoogleTransCookies();
      window.location.reload();
      setIsGoogTransKo(true);
    }
  };

  return (
    <div>
      {loading && <Loading />}
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
