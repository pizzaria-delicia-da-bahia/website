import { createGlobalStyle } from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import { colors } from "@styles/colors";
import scrollbar from "./scrollbar";
import { shapes } from "@styles/shapes";

const Globals = createGlobalStyle`

/* @font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
} */

@media (prefers-color-scheme: dark) {
body {
  background-color: ${colors.background};
    
}
}
:root {
     color-scheme: light only;
}

${scrollbar(colors.elements)}

body{
  background-color: ${colors.background};
  height: 100vh;
  width: 100vw;
  display: flex;
  position: absolute;
  inset: 0;
  overflow: hidden;

  .toast{
    z-index: 999;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: -1;
  opacity: 0.1;
  background: ${shapes.background}
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
      user-select: none;
    }

    input{
      user-select: auto;
    }


    @media only screen {
      .onlyprint{
        display: none!important;
      } 
    }
    @media only print {
      .noprint{
        display: none!important;
      } 
    }

`;

export default Globals;
