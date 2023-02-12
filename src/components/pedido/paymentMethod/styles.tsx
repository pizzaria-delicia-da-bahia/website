import styled from "styled-components";
import { animations } from "../../../styles/animations";
import { colors } from "../../../styles/colors";
import { breakpointsMQ, hover } from "../../../styles/mediaQueries";

export const PaymentMethodStyle = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 800;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  height: min(100px, 22vw);

  ${hover} {
    &:hover {
      transform: scale(102%);
      z-index: 2;
    }
  }

  &.selected {
    transform: scale(130%);
    animation: ${animations.pulse("00000000")} 2s infinite;
    z-index: 1;
  }

  @media ${breakpointsMQ.desktopSm} {
    padding: 0.4rem;
    min-width: 20rem;
  }
`;
