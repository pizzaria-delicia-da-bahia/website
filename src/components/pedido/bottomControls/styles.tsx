import { sizes } from "@styles/sizes";
import styled, { css } from "styled-components";

export const BottomControlsStyle = styled.nav.attrs(
  (props: { fixed: boolean }) => props
)`
  padding: ${sizes.bottomControlsPad}px 0;
  width: 100%;
  display: flex;
  justify-content: center;

  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
      height: calc(${sizes.footer}px + ${sizes.bottomControls}px);
    `}

  button {
    max-height: ${sizes.bottomControls}px;
  }
`;
