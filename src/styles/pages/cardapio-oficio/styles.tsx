import styled from "styled-components";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const CardapioOficioStyle = styled.main`
  color: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0 2rem;

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

      .sabor {
        flex: 1;
        display: flex;
        align-items: center;

        .right {
          gap: 0;
          user-select: auto;

          .flavour-name {
            font-size: min(1rem, 5.5vw) !important;
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
        gap: 0.2rem;
        grid-column: 2;
        align-items: center;

        .valor {
          color: #fff;
          min-width: 4rem;
          /* min-height: 2.2rem; */
          font-size: 0.6rem;
          /* padding: 0.2rem 0.8rem;
          border-radius: 0.3rem; */
          flex-grow: 1;
          text-align: center;
          /* background-color: #fff; */

          &:nth-child(even) {
            color: ${colors.elements};
          }
        }
      }

      &:nth-child(even) {
        background-color: #00000020;
      }
    }
  }

  @media print {
    overflow: visible;
  }
`;
