import styled from "styled-components";
import { colors } from "@styles/colors";

export const ErrorStyle = styled.main`
  flex-grow: 1;
  flex-shrink: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  gap: 1rem;

  .icon {
    font-size: 6rem;
  }
  .title {
    font-size: min(3rem, 8vw);
    text-align: center;
  }

  .link {
    font-size: 2rem;
    color: ${colors.elements};
  }
`;
