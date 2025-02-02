import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ, hover } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";

export const BebidaStyle = styled.main`
  height: 50svh;
  width: 75svw;
  /* display: flex;
  flex-direction: column; */
  /* padding: 2rem 0.3rem 10rem 0.3rem; */
  /* position: relative; */
  /* gap: 0.5rem; */

  display: flex;
  flex-direction: column;
  place-items: center;
  /* grid-template-rows: max-content 1fr; */
  align-items: center;
  justify-content: stretch;
  /* padding: 1rem 0.5rem 0 0.5rem; */
  gap: 0.5rem;
  position: relative;
  color: #000;
  text-align: left;

  > .menu {
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    /* margin-bottom: 50px; */
    position: relative;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: max-content;
      position: absolute;
      padding: 0.2rem;
      height: 100%;
      width: 100%;
      overflow: auto;
      gap: 10px;
      padding: 10px;
      li {
        padding: 0.5rem;
        background-color: ${colors.elements};
        border-radius: 10px;
        gap: 0.2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        .title {
          font-size: 1rem !important;
        }

        .left {
          background-color: #fff;
          border: 2px solid #000;
          border-radius: 6px;
          height: 80px;
          width: 40px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;

          img {
            object-fit: cover;
          }
        }

        .right {
          .title {
            font-size: min(0.7rem, 2.5vw);
          }
          .value {
            font-size: min(1rem, 5vw);
          }
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
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1rem;
      }
    }
  }
`;
