import styled from "styled-components";
import { colors } from "@styles/colors";

export const AddressStyle = styled.li`
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 0.5rem;

  .name {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: min(1.5rem, 5vw);

    img {
      background-color: white;
      object-fit: scale-down;
      border: 3px solid ${colors.elements};
      border-radius: 5px;
      padding: 0.1rem;
    }

    input {
      accent-color: #03f703;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  section {
    display: flex;
    flex-direction: column;

    label {
      font-size: min(0.8rem, 2vw);
    }
    input {
      padding: 0.3rem;
    }
  }

  .name {
    grid-column: span 2;
  }

  button {
    grid-column: span 2;
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
  }
`;
