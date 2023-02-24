import styled from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";
import { colors } from "@styles/colors";

export const PedidoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  padding: 0 0 50px 0;

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
