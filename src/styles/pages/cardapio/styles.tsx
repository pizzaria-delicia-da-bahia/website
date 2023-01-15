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
  position: relative;

  .sizes {
    position: fixed;
    background-color: ${colors.background};
    z-index: 1;
    width: min(400px, 50%);
    padding: 0.5rem;
    display: flex;
    top: ${sizes.header}px;
    right: 20px;

    /* .sizes-select {
      * {
        color: black;
      }
      width: 100%;
      font-size: 0.9rem;
    } */
    select {
      width: 100%;
      height: 100%;
      flex-grow: 1;
      font-size: 1rem;
      padding: 0.5rem;
    }
  }

  .groups-left {
    position: relative;
  }

  .group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 1px;
    width: 100%;
    .group-name {
      align-self: center;
      font-size: 2em;
      color: ${colors.elements};
    }
    .group-flavours {
      display: flex;
      flex-direction: column;
      padding: 0.5em;
      justify-content: center;

      .flavour {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        user-select: none;
        cursor: pointer;

        &:hover {
          transform: scale(102%);
        }
        /* background-color: green; */

        .flavour-name {
          font-size: 1.2rem;
          margin-bottom: 5px;
          display: flex;
          gap: 5px;
          align-items: flex-start;
        }
        .flavour-ingredients {
          font-size: 0.8rem;
          display: block;
          width: 100%;
          opacity: 0.8;
        }
        .flavour-values {
          font-size: 0.8rem;
        }
      }
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    .groups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      grid-auto-flow: row dense;
      .groups-left:after {
        content: "";
        background-color: ${colors.elements};
        width: 2px;
        height: 92%;
        position: absolute;
        top: 2%;
        left: 95%;
      }
      .groups-left .group {
        .flavour {
          margin-left: 80px;
        }
      }
      .groups-right .group {
        .flavour {
          margin-left: 80px;
        }
      }

      aside {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .group {
          grid-row: span auto;
        }
      }
    }
  }
`;
