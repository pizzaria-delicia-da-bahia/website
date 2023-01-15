import styled, { css } from "styled-components";
import { animations } from "../../../styles/animations";
import { colors } from "../../../styles/colors";
import { breakpointsMQ } from "../../../styles/mediaQueries";
import BackgroundImage from "../../../assets/images/pizzas_pattern.svg";

export const NavigationStyle = styled.nav.attrs(
  (props: { menuOpen: Boolean }) => props
)`
  display: flex;
  padding: 10px 10;
  gap: 3rem;
  ul {
    list-style: none;
    .peca-ja-button {
      display: none;
    }
  }

  ${(props) =>
    props.menuOpen === true
      ? css`
          ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
            font-size: 2rem;
            position: absolute;
            top: 100%;
            right: 0;
            padding: 7rem 0.4rem;
            /* margin: 5px 5px; */
            color: #fff;
            width: 100%;
            height: 100vh;
            min-height: 10px;
            background-color: ${colors.background};
            animation: slideDown 0.5s ease-in-out;

            .peca-ja-button {
              display: block;
            }

            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1;
              user-select: none;
              pointer-events: none;
              opacity: 10%;
              background-image: url(${BackgroundImage.src});
              background-size: 60%;

              @media ${breakpointsMQ.tablet} {
                background-size: 40%;
              }
              @media ${breakpointsMQ.desktopSmUp} {
                background-size: 30%;
              }
              @media ${breakpointsMQ.tvSmUp} {
                background-size: 20%;
              }
            }

            @keyframes slideDown {
              from {
                opacity: 0%;
                top: -100vh;
              }
              to {
                opacity: 100%;
                top: 100%;
              }
            }
          }
        `
      : css`
          ul {
            animation: slideDown 0.5s ease-in-out reverse;
            top: -100vh;
            display: none;
          }
        `}

  @media ${breakpointsMQ.desktopSmUp} {
    ul {
      font-size: 1rem;
      color: #fff;
      justify-content: center;
      align-items: center;
      display: flex;
      gap: 3rem;
    }
  }
`;
