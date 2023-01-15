import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

export const LogoStyle = styled.div.attrs(
  (props: { menuOpen: Boolean }) => props
)`
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  margin-left: 30px;
  width: min(7rem, 30vw);
  height: min(8rem, 33vw);
  padding: 8px 5px 0.8rem 5px;
  transform: scale(130%);
  transform-origin: top;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  background-color: ${colors.elements};
`;
