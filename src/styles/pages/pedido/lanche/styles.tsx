import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ, hover } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";

export const LancheStyle = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0 0 0;
  position: relative;
  gap: 0.5rem;

  > .menu {
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    margin-bottom: 50px;
    position: relative;

    ul {
      position: absolute;
      height: 100%;
      list-style: none;
      padding: 0.5rem 0.5rem 6rem 0.5rem;
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: auto;
      scroll-behavior: smooth;

      li {
        padding: 0.5rem;
        background-color: ${colors.elements};
        border-radius: 10px;
        gap: 0.2rem;
        max-height: 8rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        img {
          border: 2px solid #000;
          background-color: #fff;
          object-fit: cover;
          border-radius: 6px;
          width: 110px;
          height: 90px;
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

  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: max-content;
        grid-gap: 0.5rem;
        max-height: 100%;
      }
    }
  }
`;
