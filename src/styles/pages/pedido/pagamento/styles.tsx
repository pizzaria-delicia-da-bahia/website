import styled from "styled-components";
import { colors } from "../../../colors";
import { breakpointsMQ } from "../../../mediaQueries";
import { sizes } from "../../../sizes";

export const PagamentoStyle = styled.main`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 4rem 0.3rem 0 0.3rem;
  position: relative;
  gap: 2rem;
  color: #fff;

  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    h1 {
      color: ${colors.elements};
      font-size: min(1.8rem, 5vw);
    }
    h4 {
      font-size: min(1.3rem, 3vw);
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
    .title {
      font-size: min(0.8rem, 3vw);
    }

    .value {
      text-transform: uppercase;
    }
    .input-label {
      display: block;
      padding: 0.5rem 0.5rem 0.1rem 0.5rem;
      text-align: center;
      font-size: 0.8rem;
    }

    .inputs-changes-methods {
      width: 100%;
      padding: 0 0.5rem;

      .methods {
        padding: 0.5rem 0.5rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        align-items: center;
        justify-content: space-evenly;
        /* height: rem; */
      }
      .inputs {
        .changes {
          .changes-wrapper {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.3rem;
          }
        }
      }
    }
  }

  & > .controls {
    background-color: ${colors.background};
    padding: 10px 0 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(${sizes.footer}px + 80px);
    display: flex;
    justify-content: center;

    button {
      max-height: 60px;
    }
  }

  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      .inputs-changes-methods {
        .methods {
          padding: 1rem 2rem;
        }
        .inputs {
          .changes {
            .changes-wrapper {
              gap: 1rem;
            }
          }
        }
      }
    }
  }
`;

export const InfoStyle = styled.div`
  padding: 0.2rem;
  background-color: ${colors.elements};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  color: ${colors.background};
`;
