import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ } from "@styles/mediaQueries";

export const CarouselItemStyle = styled.li.attrs(
  (props: { index: number; length: number; selectedIndex: number }) => props
)`
  -moz-user-select: none;
  scroll-snap-stop: always;
  user-select: none;
  scroll-snap-align: center;
  display: flex;
  background-color: ${colors.elements};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  cursor: pointer;
  padding: 2rem 5rem;
  min-width: 70vw;
  transition: all 0.1s linear;
  overflow: hidden;
  /* max-height: 30vh; */
  gap: 0.2rem;
  position: relative;

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    img {
      height: 100%;
    }
  }
  .subtitle {
    font-size: 0.8rem;
    font-style: italic;
    white-space: nowrap;
  }
  .bottom-elements {
    display: flex;
    gap: 1rem;
  }

  .tooltip {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: auto;

    background-color: #dddddd;
    backdrop-filter: blur(20px);
    padding: 0.5em;
    font-size: 0.8rem;
  }

  @media ${breakpointsMQ.desktopSmUp} {
    min-width: 20vw;
  }
`;
