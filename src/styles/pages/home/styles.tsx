import styled, { css } from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import mobileShape from "@assets/pages/home/home-shape-center-mobile.svg";
import tabletShape from "@assets/pages/home/home-shape-center-tablet.svg";
import desktopShape from "@assets/pages/home/home-shape-center-desktop.svg";
import { sizes } from "@styles/sizes";
import { animations } from "@styles/animations";

export const HomeStyle = styled.main.attrs(
  (props: { menuOpen: Boolean }) => props
)`
  flex-grow: 1;
  flex-shrink: 0;
  height: 100%;
  background-image: url(${mobileShape.src});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  color: #fff;
  display: flex;
  flex-direction: column;
  grid-template-columns: 0.6fr 1fr;
  padding: 4.8rem 0.5rem;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100px;

    h1,
    h3 {
      white-space: nowrap;
      line-height: 100%;
    }

    h3 {
      font-size: min(1.8rem, 5vw);
      font-weight: 100;
      letter-spacing: 1rem;
    }
    h1 {
      font-size: min(4.2rem, 15vw);
      letter-spacing: 0.3rem;
    }

    .peca-ja-button {
      margin-bottom: 10px;
      z-index: 1;
    }
  }

  .right {
    pointer-events: none;
    user-select: none;
    .pizza-image {
      animation: ${animations.floatingSkew} infinite 5.3s ease-in-out;
    }
  }

  @media ${breakpointsMQ.mobile} {
    .peca-ja-button {
      position: fixed;
      bottom: ${sizes.footer}px;
      left: 50%;
      transform: translateX(-50%);
    }

    .right {
      position: absolute;
      left: 0;
      width: 100vw;
      top: 0;
      margin-top: calc((50vh + ${sizes.header}px) - 4.8rem);
      transform: translateY(-50%);
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    padding: 6rem 0.5rem;
    background-position: 50% 80%;
    background-image: url(${tabletShape.src});
    .left {
      h3 {
        font-size: 2rem;
        letter-spacing: 1.7rem;
      }
      h1 {
        font-size: 7rem;
        letter-spacing: 0.3rem;
      }
      .peca-ja-button {
        position: inherit;
      }
    }
  }

  @media ${breakpointsMQ.mobile}, ${breakpointsMQ.tablet} {
    ${(props) =>
      props.menuOpen &&
      css`
        .right {
          display: none;
        }
      `}
    .right {
    }
  }
  @media ${breakpointsMQ.desktopSmUp} {
    padding: 6rem 3rem;
    background-position: 50% 100%;
    background-image: url(${desktopShape.src});
    display: grid;
    .left {
      align-items: flex-start;
      h3 {
        font-size: 1.8rem;
        letter-spacing: 1.7rem;
      }
      h1 {
        font-size: 5.5rem;
        letter-spacing: 0.3rem;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      height: 100px;
      align-items: flex-start;
      .image-wrapper {
        width: 23rem;
        flex-grow: 1;
        position: absolute;
        top: 0;
        transform: translateY(45%) scale(150%);
      }
    }
  }
  @media ${breakpointsMQ.desktopMdUp} {
    padding: 6.5rem 3.3rem;
    .left {
      align-items: flex-start;
      h3 {
        font-size: 1.8rem;
        letter-spacing: 1.7rem;
      }
      h1 {
        font-size: 5.5rem;
        letter-spacing: 0.3rem;
      }
    }
    .right {
      .image-wrapper {
        width: 25rem;
        transform: translateY(35%) scale(140%);
      }
    }
  }
  @media ${breakpointsMQ.desktopLg} {
    padding: 6.5rem 3.5rem;
    background-position: 50% 120%;
    .left {
      align-items: flex-start;
      h3 {
        font-size: 2rem;
        letter-spacing: 1.7rem;
      }
      h1 {
        font-size: 5.8rem;
        letter-spacing: 0.3rem;
      }
    }
    .right {
      .image-wrapper {
        transform: translateY(30%) scale(130%);
      }
    }
  }
  @media ${breakpointsMQ.tvSmUp} {
    padding: 8rem 4rem;
    background-position: 50% 100%;
    .left {
      h3 {
        font-size: 2.5rem;
        letter-spacing: 2.9rem;
      }
      h1 {
        font-size: 7.7rem;
        letter-spacing: 1rem;
      }
    }

    .right {
      .image-wrapper {
        transform: translateY(40%) scale(160%);
      }
    }
  }
  @media ${breakpointsMQ.tvMdUp} {
    padding: 8rem 4rem;
    background-position: 50% 100%;
    .left {
      h3 {
        font-size: 3rem;
      }
      h1 {
        font-size: 8.5rem;
      }
    }

    .right {
      .image-wrapper {
        transform: translateY(40%) scale(160%);
      }
    }
  }
  @media ${breakpointsMQ.tvLg} {
    padding: 8rem 4rem;
    background-position: 50% 100%;
    .left {
      h3 {
        font-size: 4rem;
      }
      h1 {
        font-size: 10rem;
      }
    }

    .right {
      .image-wrapper {
        transform: translateY(70%) scale(210%);
      }
    }
  }
`;
// #title {
//   text-align: center;
//   animation: ${flip} 1s ease-out;

//   h1 {
//     color: ${colors.textPrimary};
//     line-height: 100%;
//     margin: -5px;
//   }
//   h1:first-of-type {
//     font-size: clamp(2.5rem, 12vw, 4.9rem);
//     font-weight: 300;
//     letter-spacing: 3px;
//   }
//   h1:last-of-type {
//     font-size: clamp(2.3rem, 17vw, 6.5rem);
//     -webkit-text-stroke: 4px ${colors.textPrimary};
//     letter-spacing: 2px;
//   }
// }

// #subtitle {
//   display: flex;
//   justify-content: center;
//   animation: ${showDown} 0.5s ease-out;
//   animation-delay: 0.1s;

//   p {
//     display: block;
//     font-size: clamp(1rem, 5vw, 1.5rem);
//     color: black;
//     -webkit-text-stroke: 0.5px black;
//     &::selection {
//       background: white;
//       -webkit-text-stroke: none;
//     }
//   }
// }

// #image {
//   overflow: visible;
//   width: min(100%, 100vw, 50vh);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: auto;
//   animation: ${showDown} 1s ease-out, ${floatingSkew} 3s ease-in-out infinite;
//   animation-delay: 0s, 0.6s;

//   img {
//     width: 100%;
//     transform: scale(110%) translateX(4px) rotate(-10deg);
//     filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
//   }
// }

// #primary-button {
//   animation: ${showDown} 1s ease-out;
//   animation-delay: 0.1s;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   button {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 20px;
//     padding: 20px 40px;
//     transition: all 0.3s ease-in-out;
//     border: none;
//     background-color: ${colors.textPrimary};
//     color: ${colors.background};
//     gap: 20px;
//     cursor: pointer;
//     filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));

//     @media (hover: hover) and (pointer: fine) {
//       &:hover {
//         transform: scale(90%);
//       }
//     }

//     span {
//       font-size: min(2.3rem, 8.5vw, 3vh);
//       font-weight: 700;
//       transform: translateY(0.2rem);
//     }

//     svg {
//       margin: -0.5rem -0.4rem;
//       font-size: min(2.5rem, 12vw, 4.5vh);
//     }
//   }
// }

// @media only screen and (orientation: landscape) {
//   @media (min-width: 800px) {
//     grid-template-columns: 50% 50%;
//     grid-template-rows: repeat(9, 1fr);

//     #title {
//       grid-row: 4;
//     }
//     #subtitle {
//       grid-row: 5;
//     }
//     #primary-button {
//       grid-row: 6;
//       justify-content: flex-start;
//     }
//     #image {
//       grid-column: 2;
//       grid-row: 1 / span 9;
//       height: 100%;
//       width: min(100%, 600px);
//     }
//   }
// }
