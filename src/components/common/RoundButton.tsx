import styled from "@emotion/styled";

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
}

export const RoundButton = ({ text, ...props }: ButtonProps) => {
  return <Button {...props}>{text}</Button>;
};

const Button = styled.button<ButtonProps>``;
