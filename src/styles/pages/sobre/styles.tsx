import styled from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import { sizes } from "../../sizes";
import { colors } from "../../colors";

export const SobreStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    display: flex;
    flex-direction: column;
    /* justify-content: stretch; */
    h1 {
      color: ${colors.elements};
    }
    p {
      display: block;
      flex-grow: 1;
      font-size: min(1rem, 8vw);
      color: #fff;
      overflow-y: auto;
      &::first-letter {
        font-size: 2rem;
        font-weight: bold;
        float: left;
        margin: 0px 5px;
      }
    }
  }

  @media ${breakpointsMQ.mobile} {
    padding-bottom: calc(${sizes.footer}px + ${sizes.header}px);
    max-height: calc(100vh);
    .frame {
      width: 100%;
      flex-grow: 0;
      flex-shrink: 0;
      height: 35vh;
      iframe {
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0, rgba(0, 0, 0, 1)),
          color-stop(0.3, rgba(0, 0, 0, 1)),
          color-stop(0.43, rgba(0, 0, 0, 0))
        );
        width: 100%;
      }
    }
    .text {
      justify-content: center;
      padding: 10px;
      box-sizing: content-box;
      flex-grow: 0;
      flex-shrink: 1;
      max-height: 60vh;
      overflow: scroll;
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    padding: 19rem 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-self: center;
    height: 100%;
    iframe {
      transform: scale(80%) rotate(-7deg);
    }
  }
  @media ${breakpointsMQ.desktopSmUp} {
    padding: 16rem 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-self: center;
    height: 100%;
    iframe {
      transform: scale(60%) rotate(-7deg);
    }
  }
  @media ${breakpointsMQ.tvSmUp} {
    padding: 16rem 6rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-self: center;
    height: 100%;
    .frame {
      iframe {
        transform: scale(100%) rotate(-7deg);
      }
    }
    .text {
      justify-content: center;
      padding: 10px;
      box-sizing: content-box;
      flex-grow: 0;
      flex-shrink: 1;
      max-height: 60vh;
      overflow: scroll;

      p {
        font-size: min(1.6rem, 1.5vw);
      }
    }
  }
`;
