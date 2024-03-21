import styled from "@emotion/styled";
import { LinkProps } from "react-router-dom";

interface ButtonProps {
  text?: string;
  white?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
  as?: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
}

export const SquareButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
};

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  font-family: var(--font--Pretendard);
  font-size: 1rem;
  padding: 12px 24px;
  background-color: ${props => (props.white ? "#fff" : "var(--main-color)")};
  color: ${props => (props.white ? "#222" : "#fff")};
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    background-color: ${props => (props.white ? "var(--gray100-color)" : "var(--hover-color)")};
  }
`;
