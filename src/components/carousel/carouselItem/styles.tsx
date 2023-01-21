import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpointsMQ } from "../../../styles/mediaQueries";

const selected = "&.selected.selected";
// const previous = "&:has(~ li.selected)";
// const next = "&.selected + li";
const previous = "&.previous.previous";
const next = "&.next.next";
const hidden = "&.hidden.hidden";

export const CarouselItemStyle = styled.li.attrs(
  (props: { index: number; length: number; selectedIndex: number }) => props
)`
  display: none;
  -moz-user-select: none;
  user-select: none;
  /* position: absolute; */

  ${selected}, ${previous}, ${next} {
    display: flex;
    background-color: ${colors.elements};
    justify-content: center;
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
    transform: scale(70%);

    min-width: 15rem;
  }

  ${selected} {
    transform: scale(90%);
    padding: 0.1rem 3rem;
    z-index: 1;
    min-width: 7rem;
  }
  ${hidden} {
    display: none;
  }
  .image-wrapper {
    overflow: hidden;
    /* height: 100%; */
    max-height: 35%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    /* width: 100%; */

    img {
      /* display: none; */
      height: 100%;
      /* transform: scale(calc(15% * ${(props) => props.index + 1})); */
    }
  }
  .bottom-elements {
    display: flex;
    gap: 1rem;
  }

  /* @media ${breakpointsMQ.tabletUp} {
    ${selected} {
      padding: 3rem 2rem;
      min-width: 11rem;
    }

    ${previous}, ${next} {
      padding: 1.5rem 1rem;
      min-width: 9rem;
    }
  } */

  @media ${breakpointsMQ.desktopSmUp} {
    ${previous}, ${next} {
      min-width: 15rem;
    }
    ${selected} {
      min-width: 20rem;
    }
  }
`;
