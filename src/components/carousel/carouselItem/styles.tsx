import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

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
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    cursor: pointer;
  }

  ${previous}, ${next} {
    pointer-events: none;
    opacity: 0.8;
    padding: 1.5rem 1rem;
    * {
      transform: scale(80%);
    }
    min-width: 9rem;
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
    padding: 3rem 2rem;
    z-index: 1;
    min-width: 11rem;
    /* min-height: 15.5rem;
    min-width: 13.5rem; */
  }
  ${previous} {
    top: 50%;
    left: 50%;
    transform: translate(-100%, -50%);
  }
  ${hidden} {
    display: none;
  }
`;
