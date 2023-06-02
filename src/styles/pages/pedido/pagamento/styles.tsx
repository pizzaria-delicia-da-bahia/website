import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";

export const PagamentoStyle = styled.main`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0.3rem calc(50px + 1rem) 0.3rem;
  gap: 0.8rem;
  color: #fff;

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    .title {
      font-size: min(0.8rem, 3vw);
    }

    .value {
      text-transform: uppercase;
    }
    .input-label {
      display: block;
      padding: 0.2rem 0.5rem 0.1rem 0.5rem;
      text-align: center;
      font-size: 0.8rem;

      &.no-change-container {
        font-size: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        input {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }

    .inputs-changes-methods {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .methods {
        ul {
          padding: 0.5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 0.5rem;
        }
      }

      .changes {
        &.disabled {
          opacity: 0;
        }
        .changes-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
      }
    }
  }

  .change-modal {
    input {
      padding: 0.5rem;
      border: 1px solid #000;
      border-radius: 10px;
      font-size: 1rem;
    }
  }

  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      .inputs-changes-methods {
        .methods {
          ul {
            display: grid;
            padding: 1rem 2rem;
          }
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
