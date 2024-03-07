import styled from "@emotion/styled";
import { Link } from "react-router-dom";

interface ButtonProps {
  text?: string;
  white?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  to?: string;
}

export const SquareButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
};

export const SquareLink = ({ text, to, ...props }: ButtonProps) => {
  return (
    <Button as={Link} to={to} {...props}>
      {text}
    </Button>
  );
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
    background-color: ${props => (props.white ? "var(--gray300-color)" : "var(--dark-color)")}; // 임시
  }
`;
