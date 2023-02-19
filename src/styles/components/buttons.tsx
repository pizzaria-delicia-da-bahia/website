import styled, { css } from "styled-components";
import { animations } from "../animations";
import { colors } from "../colors";
import { breakpointsMQ, hover } from "../mediaQueries";
import { sizes } from "../sizes";

export const Button = styled.button`
  padding: 0.8rem 1rem;
  font-size: min(0.9rem, 4vw);
  margin: 0 0.5rem;
  border-radius: 2rem;
  font-weight: bold;
  position: relative;
  transition: all linear 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;

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

  @media ${breakpointsMQ.tabletUp} {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
`;

export const ButtonPrimary = styled(Button)`
  position: relative;
  background-color: ${colors.elements};
  color: ${colors.background};
  border: 5px solid ${colors.elements};
  transform: scale(1);

  &.pulse,
  &:not(:disabled) {
    animation: ${animations.pulse(colors.elements)} 2s ease-in-out infinite;
  }
`;

export const ButtonSecondary = styled(Button)`
  position: relative;
  border: 5px solid ${colors.elements};
  background-color: transparent;
  color: ${colors.elements};
`;

export const ButtonBackForward = styled(Button).attrs(
  (props: { to: "back" | "forward" }) => props
)`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  font-size: 2.5rem;
  padding: 0;
  margin: 0 1rem;
  animation: ${animations.pulse("00000000")} 2s ease-in infinite;

  &::before {
    ${(props) =>
      props.to === "back"
        ? css`
            content: "⬅️";
          `
        : css`
            content: "➡️";
          `}
    position: absolute;
    color: black;
    top: 0;
    left: 0;
    margin: 50% 0 0 50%;
    transform: translate(-50%, -50%);
  }

  @media ${breakpointsMQ.tabletUp} {
    font-size: 2rem;
    width: 40px;
    height: 40px;
  }
`;

export const FloatButton = styled(ButtonPrimary)`
  position: fixed;
  bottom: ${sizes.footer}px;
  right: 0;
  margin: 0 0.5rem 4rem 0%;
  width: min(9em, 25vw);
  height: min(9em, 25vw);
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  transition: all 0.2s;
  padding: 0;
  z-index: 99;
  display: block;

  p {
    font-size: min(0.9rem, 2.5vw);
  }
  b {
    font-size: min(1.5rem, 4vw);
    font-weight: 800;
  }

  &.hidden {
    display: none;
  }
`;
