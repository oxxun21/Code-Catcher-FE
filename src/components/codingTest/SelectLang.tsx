import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import icon_dropdown from "../../assets/icon_dropdown.svg";

interface LangProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<any>>;
}

export const SelectLang = ({ language, setLanguage }: LangProps) => {
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
  padding: 10px 22px;
  border-bottom: 2px solid var(--background-color);
  position: relative;
  & > button {
    border: none;
    color: #fff;
    padding: 10px 50px 10px 20px;
    border-radius: 6px;
    font-size: 0.875rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    background: #2c2c34 url(${icon_dropdown}) no-repeat right 10px center;
  }
  & > ul {
    font-size: 0.875rem;
    position: absolute;
    bottom: -68px;
    left: 22px;
    width: 120px;
    color: #222;
    background: white;
    border-radius: 4px;
    z-index: 1;
    padding: 5px;
    & > li {
      cursor: pointer;
      padding: 10px;
      border-radius: 4px;
      &:hover {
        background-color: var(--gray300-color);
      }
    }
  }
  @media only screen and (max-width: 768px) {
    border-top: 2px solid var(--background-color);
  }
`;
