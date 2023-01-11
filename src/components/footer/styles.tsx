import styled from "styled-components";
import { colors } from "../../styles/colors";
import { breakpointsMQ, hover } from "../../styles/mediaQueries";
import { sizes } from "../../styles/sizes";
import MobileShape from "../../assets/images/footer-shape-mobile.svg";
import TabletShape from "../../assets/images/footer-shape-tablet.svg";
import DesktopShape from "../../assets/images/footer-shape-desktop.svg";

const lineHeights = ["7px", "200px", "9px"];
const lineCenter = "clamp(60%, 65%, 70%)";

export const FooterStyle = styled.footer`
  position: fixed;
  min-height: ${sizes.footer}px;
  bottom: 0;
  width: 100vw;
  flex-shrink: 0;
  background-image: url(${MobileShape.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 0%;

  @media ${breakpointsMQ.tablet} {
    background-image: url(${TabletShape.src});
  }
  @media ${breakpointsMQ.desktopSmUp} {
    background-image: url(${DesktopShape.src});
  }

  .icons {
    position: absolute;
    display: flex;
    gap: 4rem;
    left: 50%;
    transform: translateX(-55%) rotate(1deg);
    bottom: 0px;

    @media ${breakpointsMQ.tabletUp} {
      transform: rotate(4deg);
      gap: 1.5rem;
      left: 10px;
      bottom: -1px;
    }
    @media ${breakpointsMQ.tablet} {
      bottom: 1px;
    }
    @media ${breakpointsMQ.desktopSmUp} {
      bottom: 3px;
    }
    @media ${breakpointsMQ.tvSmUp} {
      bottom: 0px;
    }

    a {
      font-size: 1.8rem;
      color: ${colors.background};
      transition: all 0.2s ease-in-out;

      ${hover} {
        &:hover {
          transform: scale(120%);
        }
      }
    }

    @media ${breakpointsMQ.tablet} {
      transform: rotate(3deg);

      a {
        font-size: clamp(5vmin, 50%, 2rem);
      }
    }
    @media ${breakpointsMQ.desktopSmUp} {
      transform: rotate(4deg);
      /* bottom: 10px; */

      a {
        font-size: clamp(5vmin, 50%, 2rem);
      }
    }
  }
  .line {
    position: absolute;
    left: 0;
    width: 100vw;
    transform: rotate(4deg) skew(4deg);
    background-color: ${colors.elements};
    display: flex;
    padding-left: 10vw;
    gap: 2px;
  }

  .first-line {
    /* top: calc(${lineCenter} - calc(${lineHeights[0]} + 5px));
    height: ${lineHeights[0]}; */
    height: 7px;
  }
  .second-line {
    /* top: ${lineCenter};
    height: ${lineHeights[1]};
    align-items: baseline;
    display: flex; */
    background-color: blue;
    height: 7px;
  }
`;
// &::before {
//   position: absolute;
//   left: 0;
//   top: 0;
//   z-index: -700;
//   content: "";
//   width: 100%;
//   height: 100%;
//   background-color: ${colors.elements};
//   clip-path: polygon(0% 20%, 0% 100%, 100% 100%, 100% 100%);
// }
// &::after {
//   position: absolute;
//   left: 0;
//   top: 0;
//   z-index: -1;
//   content: "";
//   width: 100%;
//   height: 100%;
//   /* background-color: blue; */
//   background-color: ${colors.elements};
//   clip-path: polygon(0% 0%, 0% 10%, 100% 90%, 100% 80%);
// }

// height: 110px;
// /* bottom: 0; */
// background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
// background-blend-mode: overlay;
// background-size: cover;
// background-repeat: no-repeat;
// flex-shrink: 0;
// color: ${colors.background};
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// padding: 10px 20px;
// box-shadow: 0px -2px 20px rgba(0, 0, 0, 0.8);

// section {
//   display: flex;
//   flex-direction: column;
//   * {
//     text-align: center;
//   }
//   justify-content: center;
//   align-items: center;

//   svg {
//     font-size: min(1.8rem, 8vw);
//     margin: 2px;
//   }
//   small {
//     font-size: min(0.5rem, 2.5vw);
//   }
//   strong {
//     font-size: min(1rem, 4.5vw);
//     text-align: center;
//   }
// }

// @media screen and (max-width: 550px) {
//   .logo-container {
//     img {
//       width: 100px;
//     }
//   }
//   nav {
//     transform: translateY(-50%);
//     ul {
//       display: none;
//     }
//     #burger-button {
//       background-color: transparent;
//       border: none;
//       padding: 1rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       font-size: 2.5rem;
//       font-weight: 800;
//       color: ${colors.textPrimary};
//     }
//   }
// }
