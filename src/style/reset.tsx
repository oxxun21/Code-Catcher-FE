import { css } from "@emotion/react";

const reset = css`
  :root {
    --main-color: #32cd32;
    --point-color: #00e46c;
    --dark-color: #44b044;
    --light-color: #d4fed4;
    --hover-color: #8ce28c;
    --secondary-color: #192e47;
    --secondary-light-color: #27466b;
    --gray200-color: #dbdbdb;
    --gray300-color: #d3d3d3;
    --gray400-color: #989898;
    --gray500-color: #8b8b8b;
    --gray-600-color: #777777;
    --gray-700-color: #545454;
    --gray-800-color: #454545;
    --gray--900-color: #363738;
    --black-color: #222222;
    --system-negative-color: #f53966;
    --system-positivie-color: #398ff5;
    --background-color: #17171b;
    --light-background-color: #ffffff;
  }

  :root {
    --font--Pretendard: "Pretendard";
    --font--Galmuri: "Galmuri11";
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    font-weight: 400;
    background-color: var(--light-background-color);
    font-family: var(--font--Pretendard);
    color: #fff;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    all: unset;
  }

  img {
    vertical-align: top;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

export default reset;
