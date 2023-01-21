import styled from "styled-components";
import { colors } from "../../../colors";
import { breakpointsMQ } from "../../../mediaQueries";
import { sizes } from "../../../sizes";

export const InformacoesAdicionaisStyle = styled.main`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 5rem 0.3rem 15rem 0.3rem;
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
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .ordertype {
      display: flex;
      gap: 1rem;
      justify-content: center;
      font-size: 0.8rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        input {
          width: 20px;
          height: 20px;
        }
      }
    }

    .customer-info {
    }

    .address-info {
      &.disabled {
        * {
          pointer-events: none;
          user-select: none;
          opacity: 0.8;
        }

        .input-group {
          &.cep-endereco-n {
          }
        }
      }
    }
  }

  & > .bottom-controls {
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
      gap: 2rem;
      .ordertype {
        gap: 3rem;
        font-size: 1.3rem;
        span {
          label {
            user-select: none;
          }
          input {
            width: 30px;
            height: 30px;
            accent-color: ${colors.elements};
          }
          &:has(input:checked + label) {
            color: ${colors.elements};
            font-weight: bolder;
          }
        }
      }

      .address-info {
        .input-group {
          &.cep-endereco-n {
            display: grid;
            grid-template-columns: 0.3fr 1fr 0.3fr;
          }
          &.local-referencia {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      }
    }
  }
`;
