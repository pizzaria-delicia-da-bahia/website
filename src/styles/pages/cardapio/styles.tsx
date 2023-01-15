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
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        align-items: stretch;
        user-select: none;
        cursor: pointer;

        &:hover {
          transform: scale(102%);
        }
        /* background-color: green; */

        .flavour-name {
          font-size: 1.8rem;
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
        left: calc(100% - 1px);
      }
    }
  }

  @media ${breakpointsMQ.desktopSmUp} {
    .groups {
      .groups-left:after {
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
