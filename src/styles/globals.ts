import { createGlobalStyle } from "styled-components";
import BackgroundImage from "../assets/images/pizzas_pattern.svg";
import Filter from "../assets/images/filter.svg";
import { breakpointsMQ } from "./mediaQueries";
import { colors } from "./colors";

const Globals = createGlobalStyle`

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.ttf') format('ttf');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

body{
  background-color: ${colors.background};
  height: 100vh;
  width: 100vw;
  display: flex;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh; 
    pointer-events: none;
    opacity: 100%;
    z-index: 999;
    background-size: cover;
    background-blend-mode: normal;
    mix-blend-mode: multiply;
    background-image: url(${Filter.src});
    background-repeat: no-repeat;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 15%;
    z-index: -1;
    mix-blend-mode: color;
    background-image: url(${BackgroundImage.src});
    background-size: 60%;
      @media ${breakpointsMQ.tablet}{
        background-size: 40%;
      }
      @media ${breakpointsMQ.desktopUp}{
        background-size: 30%;
      }
      @media ${breakpointsMQ.tv}{
        background-size: 20%;
      }
    }

  }

  img{
    user-select: none;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      outline: none;
    }
`;

export default Globals;
