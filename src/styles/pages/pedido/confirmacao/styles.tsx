import styled from "styled-components";
import { colors } from "@styles/colors";
import { breakpointsMQ } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";
import scrollbar from "@styles/scrollbar";

export const ConfirmacaoStyle = styled.main`
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0.5rem;
  position: relative;
  gap: 0.5rem;
  color: #fff;

  .menu {
    flex: 1;
    min-height: 0;
    display: flex;
    overflow: auto;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
    background-color: ${colors.elements};
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #000;
    border-radius: 10px;

    ${scrollbar(colors.background)}
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

  @media ${breakpointsMQ.desktopSmUp} {
    .menu {
      width: max-content;
      padding: 0.5rem 2rem;
      .ordertype {
        gap: 3rem;
        font-size: 1.3rem;
        span {
          label {
            user-select: none;
          }
          input {
            width: 30px;
            height: 30px;
            accent-color: ${colors.elements};
          }
          &:has(input:checked + label) {
            color: ${colors.elements};
            font-weight: bolder;
          }
        }
      }
    }
  }
`;

export const InfoStyle = styled.div`
  padding: 0.2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  color: ${colors.background};
  .title {
    color: #000;
    font-size: min(0.9rem, 4vw);
  }
  .value {
    white-space: pre-line;
    text-transform: uppercase;
  }
`;
