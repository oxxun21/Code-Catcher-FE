import styled from "@emotion/styled";

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GalmuriButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
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
  &:hover {
    background-color: var(--dark-color); // 임시
  }
`;
