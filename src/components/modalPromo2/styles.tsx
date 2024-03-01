import styled from "styled-components";
import { breakpointsMQ, hover } from "@styles/mediaQueries";
import { colors } from "@styles/colors";

export const ModalPromoStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    object-fit: scale-down;
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    border: 1px solid #000;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    padding: 0 1rem 0.2rem 1rem;

    ${hover} {
      &:hover {
        background-color: ${colors.elements};
      }
    }
  }

  > main {
    height: 80%;
    width: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
  }
`;
