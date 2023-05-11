import styled, { css } from "styled-components";
import { colors } from "@styles/colors";

export const SaborStyle = styled.li.attrs(
  (props: { showCheckBox: boolean; ingredientesDoLado: boolean }) => props
)`
  display: flex;
  /* margin-bottom: 1rem; */

  * {
    pointer-events: none;
  }

  &.disabled {
    .left {
      .checkbox {
        pointer-events: none;
        &:hover {
          transform: scale(100%);
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    align-items: stretch;
    user-select: none;

    .flavour-name {
      font-size: min(1.5rem, 6vw);
      display: flex;
      gap: 5px;
      align-items: flex-start;
    }
    .flavour-ingredients {
      font-size: 0.8rem;
      display: block;
      width: 100%;
      flex: 1;
      opacity: 0.8;
    }
    .flavour-values {
      font-size: 0.8rem;
    }
  }

  ${(props) =>
    !!props.ingredientesDoLado &&
    css`
      padding: 0.3rem 0.2rem;
      .right {
        flex-direction: row;

        .flavour-name {
          &:after {
            content: "•";
            margin: 0 0.5rem;
            color: #fff;
          }
        }
      }
    `}

  ${(props) =>
    !props.showCheckBox &&
    css`
      .right {
        &:hover {
          transform: scale(102%);
        }
      }
    `}

  ${(props) =>
    !!props.showCheckBox &&
    css`
      cursor: pointer;
      gap: 1rem;
      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        .checkbox {
          position: relative;
          width: 30px;
          height: 30px;
          border: 2px solid ${colors.elements};
          border-radius: 50%;
          overflow: hidden;
          transition: all 0.2s ease-in-out;
          pointer-events: visible;
          cursor: pointer;

          &:hover {
            transform: scale(120%);
          }
          input {
            pointer-events: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            &:checked ~ span {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: ${colors.elements};

              &:before {
                content: "\2713";
                display: block;
                text-align: center;
                color: #000;
                position: absolute;
                left: 0.7rem;
                top: 0.2rem;
                z-index: 1;
              }
            }
          }
        }
      }
    `}
`;
