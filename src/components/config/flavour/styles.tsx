import { colors } from "@styles/colors";
import styled from "styled-components";

export const FlavourStyle = styled.li`
  padding: 0.5rem;
  border-radius: 10px;
  list-style: none;
  display: flex;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  .left {
    display: flex;
    align-items: center;
  }

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 0.5rem;
    font-size: min(1.5rem, 5vw);

    #name {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .center-bottom {
      display: flex;
      gap: 0.5rem;

      .tipo {
        cursor: pointer;
        &:hover {
          transform: scale(110%);
        }
      }

      .ingredientes {
        width: 100%;
        font-size: 0.9rem;
        opacity: 0.8;
      }
    }

    & label {
      flex-grow: 2;
      text-align: center;
    }

    & input {
      padding: 0.2rem 0;
      font-size: 1.2rem;
      flex-grow: 1;
      background-color: transparent;
      border: none;
      color: #fff;
    }

    .grupo {
      padding: 0.2rem 0;
      font-size: 1.2rem;
      width: 100%;
    }
  }
  .flavour-values {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    .flavour-value {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      label {
        font-size: min(0.8rem, 2vw);
      }
      .value {
        position: relative;
        input {
          border-radius: 5px;
          border: 2px solid #fff;
          padding: 0.3rem 0.3rem 0.3rem 1.6rem;
          background-color: transparent;
          font-size: 1.2rem;
          color: #fff;
        }
        &::after {
          content: "R$";
          position: absolute;
          transform: translate(0.3rem, -50%);
          top: 50%;
          left: 0;
        }
      }
    }
  }
  button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
  }
`;

export const GrupoSelectorStyle = styled.div`
  position: absolute;
  inset: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
  color: #fff;

  .container {
    padding: 1rem;
    background-color: ${colors.backgroundDark};
    border-radius: 10px;
    header {
      display: flex;
      justify-content: end;

      button {
        width: 3rem;
        border-radius: 5px;
        border: none;
        background-color: transparent;
        color: #fff;
        font-size: 2em;
        &:hover {
          color: ${colors.elements};
        }
      }
    }
    main {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .grupo {
        padding: 0.2rem 0;
        font-size: 1.2rem;
        width: 100%;
      }
    }
  }
`;
