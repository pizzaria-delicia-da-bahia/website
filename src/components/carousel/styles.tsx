import styled from "styled-components";
import { breakpointsMQ } from "../../styles/mediaQueries";

export const CarouselStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* gap: 0.5rem; */
  height: 45vh;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  padding-bottom: 1rem;

  ul {
    display: flex;
    justify-content: center;
    height: 80%;
    left: 0;
  }

  .buttons-back-forward {
    display: flex;
    justify-content: center;
  }
`;
