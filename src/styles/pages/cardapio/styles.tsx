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
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 0 min(2rem, 2vw);
    li {
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
      color: ${colors.background};
      background-color: ${colors.elements};
      flex-grow: 1;
      & > label {
        font-weight: bolder;
        font-size: min(1.5rem, 3vw);
      }
      .info {
        display: flex;
        gap: 0.5rem;
        font-size: min(1rem, 2.5vw);
      }
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
