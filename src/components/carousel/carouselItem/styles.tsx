import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpointsMQ } from "../../../styles/mediaQueries";

const selected = "&.selected";
const previous = "&:has(~ li.selected)";
const next = "&.selected + li";
const hidden = "&.hidden.hidden";

export const CarouselItemStyle = styled.li.attrs(
  (props: { index: number; length: number; selectedIndex: number }) => props
)`
  display: none;
  position: absolute;

  ${selected}, ${previous}, ${next} {
    display: flex;
    background-color: ${colors.elements};
    border: 2px solid blue;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.1s linear;
  }

  ${previous}, ${next} {
    pointer-events: none;
    opacity: 0.8;
    padding: 0.6rem 0.5rem;
    * {
      transform: scale(70%);
    }
    min-width: 8rem;
  }
  ${next} {
    top: 50%;
    right: 50%;
    transform: translate(100%, -50%);
  }

  ${selected} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem 0.7rem;
    z-index: 1;
    min-width: 9rem;
  }
  ${previous} {
    top: 50%;
    left: 50%;
    transform: translate(-100%, -50%);
  }
  ${hidden} {
    display: none;
  }

  .image-wrapper {
    flex-grow: 1;
    text-align: center;
  }

  .bottom-elements {
    display: flex;
    gap: 2.5em;
    flex-grow: 0;
  }

  @media ${breakpointsMQ.tabletUp} {
    ${selected} {
      padding: 3rem 2rem;
      min-width: 11rem;
    }

    ${previous}, ${next} {
      padding: 1.5rem 1rem;
      min-width: 9rem;
    }
  }
`;
