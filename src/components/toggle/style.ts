import { colors } from "@styles/colors";
import styled from "styled-components";

export const ToggleStyle = styled.div`
  padding-right: 10px;
  #toggle {
    border: 3px solid ${colors.elements};
    border-radius: 20px;
    width: 3rem;
    height: 1.5rem;
    cursor: pointer;
    position: relative;

    input {
      display: none;
    }

    #dot {
      position: absolute;
      background-color: ${colors.elements}95;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      transition: all 0.5s;
      left: 0;
    }
  }

  &.checked {
    #toggle {
      #dot {
        background-color: ${colors.elements};
        transform: scale(150%) translateX(75%);
        /* left: auto;
      right: 0; */
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
