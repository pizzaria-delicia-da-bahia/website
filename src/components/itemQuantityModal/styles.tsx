import styled from "styled-components";
import { colors } from "@styles/colors";

export const ItemQuantityModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  background-color: ${colors.background};
  width: 80vw;
  width: 30vw;
  min-width: 350px;

  height: 40vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .text {
    .title {
      font-size: min(2rem, 5vw);
    }
    .subtitle {
      font-size: min(0.7rem, 2.7vw);
      color: #fff;
      b {
        font-weight: bolder;
        font-size: min(1rem, 3vw);
      }
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    align-items: center;

    input {
      font-size: min(2rem, 5vw);
      padding: 0.5rem;
      border-radius: 10px;
      text-align: center;
    }
  }

  .bottom-controls {
    display: flex;
    justify-content: center;
  }

  &:before {
    content: "";
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: -30vh;
    left: -35vw;
    z-index: -999;
    width: 135vw;
    height: 100vh;
  }

  &:after {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -999;
    background-color: ${colors.background};
    border-radius: 10px;
    width: 80vw;
    width: 30vw;
    min-width: 350px;

    height: 40vh;
    transform: translate(-50%, -50%);
  }
`;
