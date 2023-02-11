import styled from "styled-components";
import { breakpointsMQ, hover } from "../../../styles/mediaQueries";
import { sizes } from "../../../styles/sizes";
import { colors } from "../../../styles/colors";

export const ItensStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 5rem 0.5rem calc(${sizes.footer}px + ${sizes.header}px + 2rem) 0.5rem;
  gap: 1.5rem;
  overflow: hidden;

  .text {
    h1 {
      color: ${colors.elements};
    }
  }

  .menu {
    width: 100%;
    flex-grow: 0;
    height: 35vh;
    max-height: 35vh;
    overflow: auto;
    padding: 0.8rem 0.5rem;

    ul {
      height: 100%;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      li {
        background-color: ${colors.elements};
        display: flex;
        padding: 0.5rem;
        gap: 0.5rem;
        border-radius: 1rem;

        .left {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .item-title {
            font-size: min(1.5rem, 5vw);
          }
          .item-subtitle {
            font-size: min(1.2rem, 3vw);
          }
          .item-info {
            font-size: min(1.3rem, 3.2vw);
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            background-color: transparent;
            border: none;
            border-radius: 50%;
            background-color: ${colors.background};
            color: #fff;
            flex-grow: 0;
            flex-shrink: 0;
            width: min(4rem, 10vw);
            height: min(4rem, 10vw);
            /* height: 4rem; */
            font-size: min(2rem, 5vw);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        .subdiv {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          .subleft {
            img {
              border: 2px solid #000;
              background-color: #fff;
              object-fit: scale-down;
              border-radius: 6px;
              padding: 0.2rem;
            }
          }
        }
      }
    }
  }

  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: max-content;
      }

      ul:has(li:only-child) {
        grid-template-columns: 1fr;
      }
    }
  }
`;
