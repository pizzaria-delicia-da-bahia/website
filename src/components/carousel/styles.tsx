import styled from "styled-components";
import { breakpointsMQ, hover } from "../../styles/mediaQueries";

export const CarouselStyle = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  display: flex;
  /* gap: 0.5rem; */
  /* height: 45vh; */
  /* flex-grow: 0;
  flex-shrink: 0;
  padding-bottom: 1rem; */
  width: 100vw;

  .carousel-container {
    overflow-x: hidden;
    width: 100vw;
    min-width: 0;

    ul {
      overflow-x: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scroll-snap-stop: always;
      padding: 1rem 5rem;
      gap: 0.5rem;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .buttons-back-forward {
    display: none;
    justify-content: center;
  }

  ${hover} {
    .carousel-container {
      ul {
        &::-webkit-scrollbar {
          display: block;
        }
      }
    }
  }
  @media ${breakpointsMQ.desktopSmUp} {
    .carousel-container {
      ul {
        justify-content: center;
      }
    }
  }
`;
