import styled from "@emotion/styled";
import { LinkProps } from "react-router-dom";

interface ButtonProps {
  text?: string;
  dark?: boolean;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
  as?: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
}

export const RoundButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
};

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  width: ${props => props.width || "auto"};
  font-family: var(--font--Pretendard);
  font-size: 1rem;
  padding: 16px;
  background-color: ${props => (props.dark ? "var(--secondary-color)" : "#f4f4f4")};
  color: ${props => (props.dark ? "#fff" : "#222")};
  border: ${props => (props.dark ? "1px solid var(--black-color)" : "1px solid var(--gray200-color)")};
  border-radius: 20px;
  transition: all 0.3s;
  text-align: center;
  &:hover {
    background-color: ${props => (props.dark ? "var(--secondary-light-color)" : "var(--gray200-color)")};
    border: ${props => (props.dark ? "1px solid var(--black-color)" : "1px solid var(--gray400-color)")};
  }
`;
