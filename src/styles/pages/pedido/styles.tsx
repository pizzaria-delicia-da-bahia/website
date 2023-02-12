import styled from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import { sizes } from "../../sizes";
import { colors } from "../../colors";

export const PedidoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(${sizes.header}px + 10rem) 0.5rem 10rem 0.5rem;
  height: calc(100vh - (${sizes.header}px + ${sizes.footer}px));
  gap: 2rem;

  .text {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;

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
    display: flex;
    justify-content: center;
    align-items: center;
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

  @media ${breakpointsMQ.desktopLgUp} {
    padding: 1rem;
    height: 100%;
  }
`;
