import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import icon_dropdown from "../../assets/icon_dropdown.svg";

export const SelectLang = () => {
  const [language, setLanguage] = useState("Java");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <LangSelect ref={dropdownRef}>
      <button onClick={toggleDropdown}>{language}</button>
      {showDropdown && (
        <ul>
          <li onClick={() => handleLanguageSelect("Java")}>Java</li>
          <li onClick={() => handleLanguageSelect("Python")}>Python</li>
        </ul>
      )}
    </LangSelect>
  );
};

const LangSelect = styled.article`
  width: 100%;
  padding: 14px 16px;
  /* margin-bottom: 20px; */
  border-bottom: 2px solid var(--background-color);
  position: relative;
  & > button {
    border: none;
    color: #fff;
    padding: 10px 50px 10px 20px;
    border-radius: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    background: url(${icon_dropdown}) #2c2c34 no-repeat right 10px center;
    background-size: 10px/5px;
  }
  & > ul {
    position: absolute;
    bottom: -75px;
    left: 16px;
    width: 120px;
    color: #000;
    background: white;
    border-radius: 4px;
    z-index: 1;
    padding: 5px 0;
    & > li {
      cursor: pointer;
      padding: 10px 20px;
    }
  }
`;
