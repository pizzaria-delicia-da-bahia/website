import styled from "styled-components";
import { breakpointsMQ, hover } from "../../../../mediaQueries";
import { sizes } from "../../../../sizes";
import { colors } from "../../../../colors";

export const TamanhoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0.5rem;
  gap: 0.1rem;
  overflow: hidden;

  .text {
    display: flex;
    flex-direction: column;
    h1 {
      color: ${colors.elements};
    }
  }

  .menu {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 30vh; */
    /* padding: 0 0.1rem; */
    /* max-width: 800px; */
  }

  .bottom-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.2rem;

    b {
      font-size: 1rem;
    }
    span {
      font-size: 0.7rem;
    }
  }

  @media ${breakpointsMQ.mobile} {
    /* padding-bottom: calc(${sizes.footer}px + ${sizes.header}px);
    max-height: calc(100vh); */

    .text {
      justify-content: center;
      padding: 5px;
      box-sizing: content-box;
      flex-grow: 0;
      flex-shrink: 1;
      max-height: 60vh;
    }

    .menu {
      height: 40vh;
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    /* padding: 19rem 2rem; */
    display: flex;
    gap: 1rem;
    align-self: center;
    height: 100%;
    padding: 4rem 0.5rem;

    .bottom-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem 0.2rem;

      b {
        font-size: 1.5rem;
      }
    }
  }
`;
