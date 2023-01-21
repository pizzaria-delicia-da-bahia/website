import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const MyInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.2rem;

  label {
    font-size: 0.8rem;
  }
  input {
    text-transform: uppercase;
    font-size: 1.2rem;
    padding: 0.3rem;
    border: 0.15em solid #000;
    border-radius: 10px;
    line-height: 100%;
    &::placeholder {
      font-size: min(1rem, 2.8vw);
    }
  }
`;
