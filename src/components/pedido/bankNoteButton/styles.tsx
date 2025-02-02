import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ } from "@styles/mediaQueries";

export const ButtonBankNoteStyle = styled.button`
  width: min(7rem, 25vw);
  aspect-ratio: 5.5/2;
  position: relative;
  transition: 0.2s ease-in-out;

  img {
    user-select: none;
    pointer-events: none;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
  }
  &.selected {
    transform: scale(140%);
    z-index: 1;
    border: 3px solid ${colors.elements};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  }
`;
