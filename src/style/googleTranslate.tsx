import { css } from "@emotion/react";

const googleTranslate = css`
  .translation-links {
    li {
      padding: 10px;
      margin-right: 20px;
    }

    li > a {
      font-weight: 600;
      color: var(--gray800-color);
    }
  }

  .skiptranslate {
    display: none !important;
  }

  body {
    top: 0px !important;
  }
`;

export default googleTranslate;
