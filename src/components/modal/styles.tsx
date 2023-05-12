import styled from "styled-components";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const ModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  top: calc(0 - ${sizes.header}px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.95);
  transition: all 0.2s ease-out;
  gap: 1rem;

  > main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    padding: 3rem 2rem;
    border-radius: 1rem;
    position: relative;

    footer {
      position: relative;
    }
  }
`;
