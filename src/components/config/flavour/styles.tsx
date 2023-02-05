import styled from "styled-components";

export const FlavourStyle = styled.li`
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 10px;
  list-style: none;
  .name {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: min(1.5rem, 5vw);

    & > label {
      flex-grow: 2;
      text-align: center;
    }

    & > input {
      padding: 0.2rem 0;
      font-size: 1.2rem;
      flex-grow: 1;
    }

    & > input[type="checkbox"] {
      accent-color: #03f703;
      width: 20px;
      height: 20px;
      cursor: pointer;
      flex-grow: 0;
    }

    .grupo {
      padding: 0.2rem 0;
      font-size: 1.2rem;
      width: 100%;
    }

    .ingredientes {
      width: 100%;
    }
  }
  .flavour-values {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    .flavour-value {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      label {
        font-size: min(0.8rem, 2vw);
      }
      input {
        padding: 0.2rem 0;
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
