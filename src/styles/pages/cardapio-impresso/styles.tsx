import styled from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import { colors } from "@styles/colors";
import { animations } from "@styles/animations";
import { sizes } from "@styles/sizes";

export const CardapioImpressoStyle = styled.main`
  color: #fff;
  width: 100%;
  /* max-height: calc(100vh - ${sizes.header}px - ${sizes.footer}px); */
  height: 100%;
  /* aspect-ratio: 1.414; */
  overflow: auto;
  scroll-behavior: smooth;
  /* padding: 0.8rem 1.2rem 0 1.2rem; */
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  flex-direction: column;
  gap: 0.3rem;

  * {
    user-select: text;
  }
  .grupo {
    text-align: center;
  }
  .sabores {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.3rem;
    .sabor-valores {
      display: flex;
      padding: 0.25rem 0.2rem;

      .sabor {
        flex: 1;
        display: flex;
        align-items: center;

        .right {
          gap: 0;
          user-select: auto;

          .flavour-name {
            font-size: min(1.2rem, 6vw) !important;
            gap: 5px;
            color: ${colors.elements};
          }
          .flavour-ingredients {
            font-size: 0.75rem;
            opacity: 0.8;
          }
        }
      }
      .valores {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.8rem;
        grid-column: 2;
        align-items: center;

        .valor {
          color: ${colors.background};
          min-width: 5.5rem;
          min-height: 2.4rem;
          font-size: 0.7rem;
          padding: 0.5rem 0.8rem;
          border-radius: 0.3rem;
          flex-grow: 1;
          text-align: center;
          position: relative;
          background-color: #fff;

          p {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            padding: 0.2rem;
          }

          &:nth-child(even) {
            background-color: ${colors.elements};
            p {
              background-color: ${colors.elements};
            }
          }
        }
      }

      &:nth-child(even) {
        background-color: #00000020;
      }
      &:nth-child(1) {
        .sabor {
          font-size: 1.5rem;
          font-weight: bolder;
        }
        .valores {
          .valor {
            font-size: 1rem;
            font-weight: bolder;
          }
        }
      }
    }
  }

  @media print {
    overflow: visible;
  }
`;
