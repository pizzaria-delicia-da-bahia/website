import styled from "styled-components";
import { MyInputStyle } from "@components/pedido/myInput/styles";
import { animations } from "@styles/animations";
import { colors } from "@styles/colors";
import { breakpointsMQ, hover } from "@styles/mediaQueries";

export const InformacoesAdicionaisStyle = styled.main`
  height: calc(100% - 50px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 3rem 0.3rem;
  position: relative;
  gap: 2rem;
  color: #fff;

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
        input[type="radio"] {
          width: 20px;
          height: 20px;
          accent-color: ${colors.elements};
        }
      }

      &.no-type {
        animation: ${animations.pulse(colors.elements, 0.93)} 2s infinite;
      }
    }

    .customer-info {
    }

    .address-info {
      .input-group {
        &.cep-endereco-n {
          .cep {
            display: flex;
            grid-template-columns: 1fr 50px;
            padding-right: 0.5rem;
            max-width: 100%;

            & > div {
              flex-grow: 1;
              flex-shrink: 1;
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
    }

    section {
      &.disabled {
        * {
          pointer-events: none;
          user-select: none;
          opacity: 0.4;
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
