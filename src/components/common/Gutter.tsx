import styled from "@emotion/styled";
import gutter_horizontal from "../../assets/gutter_horizontal.svg";
import gutter_vertical from "../../assets/gutter_vertical.svg";

interface GutterProps {
  orientation: "vertical" | "horizontal";
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  changeBackColor?: boolean;
}

export const Gutter = ({ orientation, onMouseDown, changeBackColor = false }: GutterProps) => {
  return (
    <GutterStyle orientation={orientation} onMouseDown={onMouseDown} changeBackColor={changeBackColor}>
      <img src={orientation === "horizontal" ? gutter_horizontal : gutter_vertical} alt="Gutter" />
    </GutterStyle>
  );
};

const GutterStyle = styled.div<GutterProps>`
  width: ${props => props.orientation === "horizontal" && "24px"};
  height: ${props => props.orientation === "vertical" && "24px"};
  background-color: ${props => (props.changeBackColor ? "#3F3F47" : "#323239")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${props => props.orientation === "horizontal" && "2px solid var(--background-color)"};
  border-top: ${props => props.orientation === "vertical" && "2px solid var(--background-color)"};
  cursor: ${props => (props.orientation === "horizontal" ? "e-resize" : "n-resize")};
  z-index: 10;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
