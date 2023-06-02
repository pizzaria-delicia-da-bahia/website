import styled from "styled-components";
import { animations } from "@styles/animations";
import { breakpointsMQ, hover } from "@styles/mediaQueries";
import { colors } from "@styles/colors";

export const PaymentMethodStyle = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 800;
  border: none;
  background-color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  height: min(9rem, 25vw);
  width: min(18rem, 70vw);
  border: 4px solid #000;

  ${hover} {
    &:hover {
      transform: scale(102%);
      z-index: 2;
    }
  }

  &.selected {
    animation: ${animations.pulse("00000000")} 2s infinite;
    z-index: 1;
  }

  @media ${breakpointsMQ.desktopSm} {
    padding: 0.4rem;
    min-width: 20rem;
  }
`;
