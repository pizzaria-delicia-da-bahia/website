import styled from "styled-components";
import { colors } from "../../styles/colors";

export const BadgeStyle = styled.span`
  position: absolute;
  background-color: #fff;
  padding: 0.5rem 0.5rem;
  height: 30px;
  width: 30px;
  color: ${colors.background};
  border-radius: 50%;
  top: -7px;
  right: -7px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.hidden {
    display: none;
  }
`;
