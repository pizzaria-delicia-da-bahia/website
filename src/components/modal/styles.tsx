import styled from "styled-components";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const ModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  top: calc(0px - ${sizes.header}px);
  left: 0;
  /* top: 0; */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  transition: all 0.5s ease-out;
  gap: 1rem;
  z-index: 999;
  padding: 0.5rem;

  text-align: center;

  > main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: ${colors.background};
    padding: 3rem 2rem;
    border-radius: 1rem;
    position: relative;
    transition: all 0.5s ease-out;

    footer {
      position: relative;
    }
  }
`;
