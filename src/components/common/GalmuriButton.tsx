import styled from "@emotion/styled";
import { Link } from "react-router-dom";

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
}

export const GalmuriButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
};

export const GalmuriLink = ({ text, to, ...props }: ButtonProps) => {
  return (
    <Button as={Link} to={to} {...props}>
      {text}
    </Button>
  );
};

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  font-family: var(--font--Galmuri);
  font-size: 1.25rem;
  padding: 20px 60px;
  background-color: var(--main-color);
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s;
  text-align: center;
  &:hover {
    background-color: var(--dark-color); // 임시
  }
`;
