import styled from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const SaboresStyle = styled.main`
  color: #fff;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  padding: 2rem 0.3rem 5rem 0.3rem;
  gap: 2rem;

  > .title {
    text-align: center;

    h1 {
      color: ${colors.elements};
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
      gap: 0.8rem;
    }
  }

  .bottom-info {
    position: fixed;
    left: 0;
    bottom: ${sizes.footer}px;
    /* height: calc(${sizes.footer}px + 1rem); */
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

  .observacoes-modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 0.5rem;
      border: 1px solid #000;
      border-radius: 10px;
      font-size: 1rem;
    }

    .borda-gratis {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;

      .borda-gratis-list {
        display: flex;
        list-style: none;
        border: 4px solid ${colors.elements};
        border-radius: 10px;
        width: 100%;
        justify-content: stretch;
        overflow: hidden;
        background-color: ${colors.elements};

        .borda-gratis-item {
          flex: 1;
          padding-block: 0.7rem;
          transform: scale(102%);
          background-color: ${colors.background};

          &.checked {
            background-color: ${colors.elements};
            color: ${colors.background};
          }
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
