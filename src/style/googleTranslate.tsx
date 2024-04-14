import { css } from "@emotion/react";

const googleTranslate = css`
  .translation-links {
    li {
      padding: 10px;
      margin-right: 20px;
      @media only screen and (max-width: 480px) {
        display: flex;
        justify-content: center;
        margin-right: 0;
        font-size: 0.625rem;
        font-weight: 500;

        & a > p {
          text-align: center;
          margin-top: 4px;
        }
      }
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
