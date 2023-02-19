import styled, { css } from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import mobileShape from "../../../assets/pages/home/home-shape-center-mobile.svg";
import tabletShape from "../../../assets/pages/home/home-shape-center-tablet.svg";
import desktopShape from "../../../assets/pages/home/home-shape-center-desktop.svg";
import { sizes } from "../../sizes";
import { animations } from "../../animations";
import { colors } from "../../colors";

export const ConfigStyle = styled.main`
  color: #fff;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem 0.3rem;
  position: relative;
  ul {
    list-style: none;
  }

  .controller {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    * {
      font-size: min(2rem, 5vw);
      padding: 0.5rem;
    }
    select {
      width: 100%;
      max-width: 25rem;
    }
    margin-bottom: 1rem;

    #show-new {
      position: relative;
      width: 50px;
      height: 50px;
      transform: scale(50%);
      transition: all 0.2s ease-out;
      flex-shrink: 0;
      &:hover {
        transform: scale(60%);
      }
      &:after {
        content: "+";
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 100%;
        position: absolute;
        left: -25%;
        top: -25%;
        width: 150%;
        height: 150%;
        border-radius: 50%;
        border: 4px solid #000;
        background-color: #03f703;
        cursor: pointer;
        color: #000;
        font-size: 2rem;
      }
    }
  }

  .page-control {
    display: flex;
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
    gap: 1rem;
    button {
      padding: 1rem;
      font-size: 2rem;
      border-radius: 50%;
      background-color: ${colors.elements};
      flex-shrink: 0;
      flex-grow: 0;
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .flavours,
  .sizes,
  .drinks,
  .snacks {
    flex-direction: column;
    display: flex;
    gap: 0.8rem;
  }

  @media ${breakpointsMQ.desktopSmUp} {
    .flavours {
      grid-template-columns: repeat(2, 1fr);
      display: grid;
    }
    .sizes,
    .drinks,
    .snacks {
      grid-template-columns: repeat(3, 1fr);
      display: grid;
    }
  }

  @media ${breakpointsMQ.desktopMdUp} {
    .sizes {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media ${breakpointsMQ.tvMdUp} {
    .flavours {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media ${breakpointsMQ.tvLg} {
    .flavours {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .hidden {
    display: none;
  }
`;
