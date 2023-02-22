import styled from "styled-components";
import { colors } from "@styles/colors";

export const MyInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.1rem;
  min-width: 0;

  label {
    font-size: 0.6rem;
  }
  input,
  select {
    text-transform: uppercase;
    font-size: 1.1rem;
    padding: 0.3rem;
    border: 0.15em solid #000;
    border-radius: 10px;
    line-height: 100%;
    &::placeholder {
      font-size: min(1rem, 3vw);
    }
  }
`;
