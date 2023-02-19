import styled from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import { sizes } from "../../sizes";
import { colors } from "../../colors";

export const PedidoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  padding: 0 0 50px 0;

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
`;
