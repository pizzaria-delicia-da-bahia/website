import styled from "styled-components";
import { breakpointsMQ, hover } from "../../mediaQueries";
import { sizes } from "../../sizes";
import { colors } from "../../colors";

export const PedidoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0.5rem calc(${sizes.footer}px + ${sizes.header}px + 2rem) 0.5rem;
  gap: 2.5rem;
  overflow: hidden;

  .text {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    h1 {
      color: ${colors.elements};
      font-size: min(2rem, 9vw);
    }
    h4 {
      color: #fff;
      font-size: min(1.4rem, 6vw);
      letter-spacing: 0.42rem;
    }
  }

  .menu {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
    padding: 0 0.1rem;
    max-width: 800px;
  }

  .bottom-controls {
    display: flex;
    justify-content: center;
  }

  @media ${breakpointsMQ.tabletUp} {
    gap: 2rem;
    height: calc(100vh - ${sizes.header}px);
    padding: 2rem 0.5rem 5rem 0.5rem;

    .menu {
      height: 50vh;
    }
  }

  @media ${breakpointsMQ.desktopLg} {
    /* gap: 0.1rem; */
    padding: 1rem 0.5rem 9rem 0.5rem;
    height: calc(100vh - ${sizes.header}px + ${sizes.footer}px);
    gap: 0.1rem;
    .menu {
      ul {
        transform: scale(90%);
      }
    }
  }
`;
