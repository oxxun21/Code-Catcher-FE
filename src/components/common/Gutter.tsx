import styled from "@emotion/styled";
import gutter_horizontal from "../../assets/gutter_horizontal.svg";
import gutter_vertical from "../../assets/gutter_vertical.svg";

interface GutterProps {
  orientation: "vertical" | "horizontal";
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  changeBackColor?: boolean;
}

export const Gutter = ({ orientation, onMouseDown, changeBackColor }: GutterProps) => {
  return <GutterStyle orientation={orientation} onMouseDown={onMouseDown} changeBackColor={changeBackColor} />;
};

const GutterStyle = styled.div<GutterProps>`
  width: ${props => props.orientation === "horizontal" && "24px"};
  height: ${props => props.orientation === "vertical" && "24px"};
  /* background: ${props =>
    props.changeBackColor && props.orientation === "horizontal"
      ? `#020202 url(${gutter_horizontal}) no-repeat center`
      : props.changeBackColor && props.orientation !== "horizontal"
      ? `#3F3F47 url(${gutter_vertical}) no-repeat center`
      : props.orientation === "horizontal"
      ? `url(${gutter_horizontal}) no-repeat center`
      : `url(${gutter_vertical}) no-repeat center`}; */
  /* background-size: ${props => (props.orientation === "horizontal" ? "auto/40px" : "40px/auto")}; */
  /* background: ${props =>
    (props.changeBackColor ? (props.orientation === "horizontal" ? "#020202" : "#3F3F47") : "") +
    ` url(${props.orientation === "horizontal" ? gutter_horizontal : gutter_vertical})` +
    " no-repeat center /" +
    (props.orientation === "horizontal" ? "auto 40px" : "40px auto")}; */
  background: ${props => props.changeBackColor && `#3F3F47 url(${gutter_vertical}) no-repeat center cover`};
  position: relative;
  border-right: ${props => props.orientation === "horizontal" && "2px solid var(--background-color)"};
  border-top: ${props => props.orientation === "vertical" && "2px solid var(--background-color)"};
  cursor: ${props => (props.orientation === "horizontal" ? "e-resize" : "n-resize")};
  z-index: 10;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
