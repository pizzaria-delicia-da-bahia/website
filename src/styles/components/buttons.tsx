import styled from "styled-components";
import { colors } from "../colors";

export const ButtonPrimary = styled.button`
  position: relative;
  background-color: ${colors.elements};
  color: ${colors.background};
  border: 5px solid ${colors.background};
`;

export const ButtonSecondary = styled.button`
  position: relative;
  border: 5px solid ${colors.elements};
  background-color: transparent;
  color: ${colors.elements};
`;
