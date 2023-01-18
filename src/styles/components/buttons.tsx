import styled, { css } from "styled-components";
import { colors } from "../colors";
import { hover } from "../mediaQueries";

export const Button = styled.button`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  margin: 0 0.5rem;
  border-radius: 2rem;
  font-weight: bold;
  position: relative;
  transition: all linear 0.1s;

  &:not(:disabled) {
    cursor: pointer;
    ${hover} {
      &:hover {
        transform: scale(110%);
      }
    }
  }
  &:disabled {
    pointer-events: none;
    user-select: none;
    opacity: 0.6;
  }
`;

export const ButtonPrimary = styled(Button)`
  position: relative;
  background-color: ${colors.elements};
  color: ${colors.background};
  border: 5px solid ${colors.background};
`;

export const ButtonSecondary = styled(Button)`
  position: relative;
  border: 5px solid ${colors.elements};
  background-color: transparent;
  color: ${colors.elements};
`;

export const ButtonBackForward = styled(ButtonPrimary).attrs(
  (props: { to: "back" | "forward" }) => props
)`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  border: 2px solid #000;
  border-radius: 50%;
  font-size: 2rem;

  padding: 0;
  &::before {
    ${(props) =>
      props.to === "back"
        ? css`
            content: "<";
          `
        : css`
            content: ">";
          `}
    /* content: "aaa"; */
    position: absolute;
    color: black;
    top: 0;
    left: 0;
    margin: 50% 0 0 50%;
    transform: translate(-50%, -50%);
  }
`;
