import styled from "styled-components";
import { breakpointsMQ, hover } from "../../../../mediaQueries";
import { sizes } from "../../../../sizes";
import { colors } from "../../../../colors";

export const TamanhoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  overflow: hidden;
  padding: calc(${sizes.header}px + 10rem) 0.5rem 10rem 0.5rem;
  height: calc(100vh - (${sizes.header}px + ${sizes.footer}px));

  .text {
    display: flex;
    flex-direction: column;
    h1 {
      color: ${colors.elements};
    }
  }

  .menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.2rem;

    .value {
      font-size: 1rem;
    }
    .description {
      font-size: min(0.7rem, 4vw);
    }
  }

  & > .bottom-controls {
    background-color: ${colors.background};
    padding: 5px 0 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(${sizes.footer}px + 50px);
    display: flex;
    justify-content: center;

    button {
      max-height: 50px;
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.5rem;
    height: 100%;

    .bottom-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem 0.2rem;

      .value {
        font-size: 1rem;
      }
    }
  }
`;
