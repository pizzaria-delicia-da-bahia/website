import styled from "styled-components";
import { breakpointsMQ } from "../../styles/mediaQueries";
import { sizes } from "../../styles/sizes";
import { colors } from "../../styles/colors";

export const SobreStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: calc(${sizes.footer}px + ${sizes.header}px);

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 1;
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
      transform: translateY(-3rem);
      h1 {
        text-align: center;
      }
      p {
        padding: 3rem 1rem;
        height: 38vh;
      }
    }
  }

  @media ${breakpointsMQ.tabletUp} {
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

      p {
        font-size: min(1.6rem, 1.5vw);
        height: 100%;
      }
    }
  }
`;
