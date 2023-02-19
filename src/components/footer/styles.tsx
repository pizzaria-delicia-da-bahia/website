import styled from "styled-components";
import { colors } from "../../styles/colors";
import { breakpointsMQ, hover } from "../../styles/mediaQueries";
import { sizes } from "../../styles/sizes";
import MobileShape from "../../assets/images/footer-shape-mobile.svg";
import TabletShape from "../../assets/images/footer-shape-tablet.svg";
import DesktopShape from "../../assets/images/footer-shape-desktop.svg";

export const FooterStyle = styled.footer`
  position: fixed;
  min-height: ${sizes.footer}px;
  bottom: 0;
  width: 100vw;
  flex-shrink: 0;
  background-image: url(${MobileShape.src});
  background-repeat: no-repeat;
  background-color: transparent;
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
    height: 7px;
  }
  .second-line {
    background-color: blue;
    height: 7px;
  }
`;
