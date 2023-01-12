import styled, { css } from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import mobileShape from "../../../assets/pages/home/home-shape-center-mobile.svg";
import tabletShape from "../../../assets/pages/home/home-shape-center-tablet.svg";
import desktopShape from "../../../assets/pages/home/home-shape-center-desktop.svg";
import { sizes } from "../../sizes";
import { animations } from "../../animations";
import { colors } from "../../colors";

export const CardapioStyle = styled.main`
  color: #fff;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 5rem 0.3rem;

  .left {
    position: relative;
  }
  .left:after {
    content: "";
    background-color: ${colors.elements};
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: calc(100% - 4px);
  }

  .grupo {
    display: flex;
    flex-direction: column;
    margin: 1px;
    .grupo-nome {
      align-self: center;
      font-size: 2em;
    }
    .grupo-sabores {
      display: flex;
      flex-direction: column;

      /* justify-content: center; */

      .sabor {
        margin: 0.2rem;
        margin: 0.2rem 100px;
        .sabor-nome {
          font-size: 1.2rem;
        }
        .sabor-ingredientes {
        }
      }
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row dense;
    /* display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
      */
    aside {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .grupo {
        grid-row: span auto;
      }
    }
  }
`;
