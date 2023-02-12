import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpointsMQ } from "../../../styles/mediaQueries";

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
  padding: 3rem 1rem;
  min-width: 80vw;
  transition: all 0.1s linear;
  max-height: 30vh;
  gap: 0.2rem;

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    img {
      height: 100%;
    }
  }
  .bottom-elements {
    display: flex;
    gap: 1rem;
  }

  @media ${breakpointsMQ.desktopSmUp} {
    min-width: 20vw;
  }
`;
