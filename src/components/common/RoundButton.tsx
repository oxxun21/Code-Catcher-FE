import styled from "@emotion/styled";

interface ButtonProps {
  text?: string;
  dark?: boolean;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  background-color: ${props => (props.dark ? "#192E47" : "#f4f4f4")};
  color: ${props => (props.dark ? "#fff" : "#222")};
  border: ${props => (props.dark ? "1px solid #222222" : "1px solid #DBDBDB")};
  border-radius: 20px;
  transition: all 0.3s;
  &:hover {
    // 임시
    background-color: ${props => (props.dark ? "#122134" : "#DBDBDB")};
    border: ${props => (props.dark ? "1px solid #222222" : "1px solid #989898")};
  }
`;
