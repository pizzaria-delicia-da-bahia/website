import styled from "styled-components";
import { colors } from "../../../colors";
import { breakpointsMQ, hover } from "../../../mediaQueries";
import { sizes } from "../../../sizes";

export const BebidaStyle = styled.main`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 5rem 0.3rem 15rem 0.3rem;
  position: relative;
  gap: 2rem;

  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    h1 {
      color: ${colors.elements};
      font-size: min(3rem, 9vw);
    }
  }

  .menu {
    ul {
      list-style: none;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      li {
        min-height: 10px;
        padding: 0.5rem;
        background-color: ${colors.elements};
        border-radius: 10px;
        gap: 0.2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        img {
          border: 2px solid #000;
          background-color: #fff;
          object-fit: cover;
          border-radius: 6px;
          padding: 0.2rem;
          height: 80px;
        }

        ${hover} {
          &:hover {
            transform: scale(102%);
          }
        }

        &.disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      }
    }
  }
  & > .bottom-controls {
    background-color: ${colors.background};
    padding: 10px 0 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(${sizes.footer}px + 60px);
    display: flex;
    justify-content: center;

    button {
      max-height: 60px;
    }
  }
  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
      }
    }
  }
`;
