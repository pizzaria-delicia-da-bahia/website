import styled from "styled-components";
import { breakpointsMQ } from "../../styles/mediaQueries";

export const CarouselStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  ul {
    flex-grow: 1;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .buttons-back-forward {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  @media ${breakpointsMQ.desktopLg} {
    .buttons-back-forward {
      transform: scale(70%) !important;
    }
  }
`;
