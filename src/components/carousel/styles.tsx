import styled from "styled-components";
import { breakpointsMQ, hover } from "@styles/mediaQueries";

export const CarouselStyle = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
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
      padding: 0.5rem 5rem;
      gap: 0.5rem;
      &::-webkit-scrollbar {
        display: none;
      }
    }
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
