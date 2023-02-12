import styled from "styled-components";
import { MyInputStyle } from "../../../../components/pedido/myInput/styles";
import { colors } from "../../../colors";
import { breakpointsMQ, hover } from "../../../mediaQueries";
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
    p {
      font-size: min(1rem, 3vw);
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
      .input-group {
        &.cep-endereco-n {
          .cep {
            display: grid;
            grid-template-columns: 1fr 50px;
            padding-right: 1rem;
            & > div {
              flex-grow: 1;
            }
            & > button {
              cursor: pointer;
              background-color: transparent;
              border: none;
              font-size: 2rem;
              transition: all 0.1s;
              ${hover} {
                &:hover {
                  font-size: 2.2rem;
                }
              }
            }
          }
        }
      }

      &.disabled {
        * {
          pointer-events: none;
          user-select: none;
          opacity: 0.8;
        }

        .input-group {
          &.cep-endereco-n {
          }
          &.bairro-local-referencia {
          }
        }
      }
    }
  }

  & > .bottom-controls {
    background-color: ${colors.background};
    padding: 5px 0 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(${sizes.footer}px + 50px);
    display: flex;
    justify-content: center;

    button {
      max-height: 50px;
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
          display: grid;
          &.cep-endereco-n {
            grid-template-columns: 0.3fr 1fr 0.3fr;
          }
          &.bairro-local-referencia {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: max-content;

            & > :last-child {
              grid-column: span 2;
            }
          }
        }
      }
    }
  }
`;

export const BairroSelect = styled(MyInputStyle)`
  select {
    * {
      color: #000 !important;
    }
  }
`;
