import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpointsMQ, hover } from "../../../styles/mediaQueries";

export const PaymentMethodStyle = styled.button`
  font-size: min(1.5rem, 3.5vw);
  padding: 1rem;
  border: 3px solid #000;
  /* border-width: 3px; */
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
  height: 100%;
  -webkit-text-stroke: 0.5px black;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.8);
  ${hover} {
    &:hover {
      transform: scale(105%);
      z-index: 2;
    }
  }

  &.selected {
    transform: scale(140%);
    z-index: 1;
  }

  @media ${breakpointsMQ.desktopSm} {
    padding: 0.4rem;
    min-width: 20rem;
  }
`;
