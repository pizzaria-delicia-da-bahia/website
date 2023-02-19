import styled from "styled-components";
import { breakpointsMQ } from "../../../../mediaQueries";
import { colors } from "../../../../colors";
import { sizes } from "../../../../sizes";

export const SaboresStyle = styled.main`
  color: #fff;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  padding: 2rem 0.3rem 15rem 0.3rem;
  position: relative;
  gap: 2rem;

  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    h1 {
      color: ${colors.elements};
      font-size: min(2rem, 6vw);
    }
    h4 {
      color: #fff;
      font-size: min(1.2rem, 4vw);
      letter-spacing: 0.2rem;
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

  .bottom-info {
    position: fixed;
    bottom: 0;
    height: calc(${sizes.footer}px + 60px);
    background-color: ${colors.background};
    padding: 1rem;
    display: flex;
    width: 100%;

    .selected-flavours {
      font-size: min(1.5rem, 2.8vw);
      b {
        color: ${colors.elements};
      }
    }
  }

  & > .bottom-controls {
    padding: 10px 0 0 0;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      max-height: 60px;
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
