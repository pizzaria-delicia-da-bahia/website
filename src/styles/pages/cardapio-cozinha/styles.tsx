import styled from "styled-components";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const CardapioCozinhaStyle = styled.main`
  color: #fff;
  width: 100%;
  max-height: 100%;
  /* overflow: auto; */
  scroll-behavior: smooth;
  position: relative;
  display: flex;
  flex-direction: column;
  /* gap: 0.8rem; */

  * {
    user-select: text;
  }

  .sabores {
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    flex-flow: column;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;

    width: 100%;

    .sabor {
      padding: 0.15rem 0.2rem;
      display: flex;
      align-items: center;
      min-width: 49%;
      max-width: 49%;
      /* flex: 1; */
      /* flex: 1 1 80px; */

      .right {
        gap: 0;
        user-select: auto;

        .flavour-name {
          font-size: min(1.6rem, 6vw);
          gap: 5px;
          color: ${colors.elements};
        }
        .flavour-ingredients {
          font-size: 1.2rem;
          opacity: 0.8;
        }
      }
    }
  }

  @media print {
    overflow: visible;

    .sabores {
      .sabor {
        .right {
          * {
            color: #000;
          }
        }
      }
    }
  }
`;
