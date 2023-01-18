import styled from "styled-components";
import { breakpointsMQ, hover } from "../../../../mediaQueries";
import { sizes } from "../../../../sizes";
import { colors } from "../../../../colors";

export const TamanhoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0.5rem;

  .text {
    display: flex;
    flex-direction: column;
    /* justify-content: stretch; */
    h1 {
      color: ${colors.elements};
    }
    h4 {
      color: #fff;
      font-size: 1.4rem;
      letter-spacing: 0.42rem;
    }
  }

  .menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    max-width: 800px;

    .tab-items {
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      background-color: ${colors.elements};
      border-radius: 50%;
      margin: 0 20px;
    }
    ul {
      /* display: flex; */
      position: relative;
      width: 100%;
      height: min(50vh, 600px);
      gap: 1rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding: 3rem 0.5rem;

      li {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        background-color: ${colors.elements};
        padding: 3rem 2rem;
        opacity: 0.8;
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
        cursor: pointer;
        display: none;

        &.previous {
          display: block;
          left: 20px;
          z-index: 0;
        }
        &.next {
          display: block;
          right: 20px;
          z-index: 0;
        }

        &.selected.first {
          transform: scale(130%) translate(0%, -50%);
          left: 0;
          top: 50%;
          margin: 20px 50px;
        }
        &.selected.second {
          transform: scale(130%) translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 20px 30px;
        }
        &.selected.third {
          transform: scale(130%) translate(-100%, -50%);
          left: 100%;
          top: 50%;
          margin: 20px 20px;
        }

        &.selected {
          display: block;
          z-index: 1;
          opacity: 1;

          img {
            flex-grow: 1;
            width: 300px;
            height: 300px;
          }
        }

        @media ${breakpointsMQ.desktopSmUp} {
          display: block;
          &:not(.selected).first {
            transform: scale(100%) translate(0%, -50%);
            left: 0;
            top: 50%;
            margin: 0px 0px;
            right: auto;
          }
          &:not(.selected).second {
            transform: scale(100%) translate(-50%, -50%);
            left: 50%;
            top: 50%;
            margin: 0px 0px;
            right: auto;
          }
          &:not(.selected).third {
            transform: scale(100%) translate(-100%, -50%);
            left: 100%;
            top: 50%;
            margin: 0px 0px;
            right: auto;
          }
        }
      }
    }
  }

  @media ${breakpointsMQ.mobile} {
    padding-bottom: calc(${sizes.footer}px + ${sizes.header}px);
    max-height: calc(100vh);

    .text {
      justify-content: center;
      padding: 10px;
      box-sizing: content-box;
      flex-grow: 0;
      flex-shrink: 1;
      max-height: 60vh;
      overflow: scroll;
    }

    .menu {
      height: 40vh;

      ul {
        li {
          padding: 2rem 2rem;

          &.previous {
            left: 5px;
          }
          &.next {
            right: 5px;
          }

          &.selected.first {
            transform: scale(105%) translate(0%, -50%);
            left: 0;
            top: 50%;
            margin: 0px 5px;
          }
          &.selected.second {
            transform: scale(105%) translate(-50%, -50%);
            left: 50%;
            top: 50%;
            margin: 0px 0px;
          }
          &.selected.third {
            transform: scale(105%) translate(-100%, -50%);
            left: 100%;
            top: 50%;
            margin: 0px 0px;
          }

          &.selected {
            display: block;
            z-index: 1;
            opacity: 1;

            img {
              flex-grow: 1;
              width: 300px;
              height: 300px;
            }
          }

          &:not(.selected).first {
            transform: scale(90%) translate(0%, -50%);
            left: 0;
            top: 45%;
            margin: 0px 0px;
            right: auto;
          }
          &:not(.selected).second {
            transform: scale(90%) translate(-50%, -50%);
            left: 50%;
            top: 45%;
            margin: 0px 10px;
            right: auto;
          }
          &:not(.selected).third {
            transform: scale(90%) translate(-100%, -50%);
            left: 90%;
            top: 45%;
            margin: 0px 0px;
            right: auto;
          }

          img {
            transform: scale(80%);
          }
        }
      }
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    /* padding: 19rem 2rem; */
    display: flex;
    gap: 1rem;
    align-self: center;
    height: 100%;
    padding: 4rem 0.5rem;

    .bottom-controls {
      button {
        padding: 1rem 2rem;
        font-size: 1.5rem;
        margin: 0 1rem;
      }
    }
  }
`;
