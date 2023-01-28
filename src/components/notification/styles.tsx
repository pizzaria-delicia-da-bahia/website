import styled from "styled-components";
import { colors } from "../../styles/colors";
import { hover } from "../../styles/mediaQueries";

export const NotificationStyle = styled.span`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  margin-top: 1rem;
  padding: 1rem calc(50px + 1rem) 1rem 1rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  background-color: ${colors.elements};
  color: ${colors.background};
  font-size: min(0.7rem, 2vw);
  transition: opacity 0.8s ease-in-out;
  animation: open 0.8s ease-in-out;
  border-radius: 30px;
  max-width: 70vw;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
  z-index: 999;

  @keyframes open {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(110%, -50%);
    background-color: ${colors.elements};
    border-radius: 50%;
    border: none;
    font-size: min(2.5rem, 7vw);
    color: ${colors.background};
    cursor: pointer;
    height: 50px;
    width: 50px;
    flex-grow: 0;
    flex-shrink: 0;
    display: block;

    ${hover} {
      &:hover {
        color: #000;
        font-weight: 800;
      }
    }
  }

  &.closing {
    opacity: 0;
  }
`;
