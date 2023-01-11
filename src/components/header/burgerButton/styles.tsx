import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpointsMQ } from "../../../styles/mediaQueries";
export const BurgerButtonStyle = styled.button`
  padding: 0 1rem;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;

  @media ${breakpointsMQ.desktopSmUp} {
    display: none;
  }
`;
