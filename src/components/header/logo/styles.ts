import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const LogoStyle = styled.div.attrs(
  (props: { menuOpen: Boolean }) => props
)`
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
  margin-left: 30px;
  width: min(6rem, 23vw);
  height: min(6rem, 23vw);
  padding: 0px 5px 0.8rem 5px;
  transform: scale(110%);
  transform-origin: top;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  background-color: ${colors.elements};
`;
