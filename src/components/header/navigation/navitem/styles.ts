import styled from "styled-components";
import { colors } from "@styles/colors";
import { hover } from "@styles/mediaQueries";

export const NavItemStyle = styled.li`
  transition: all 0.3s ease-in-out;
  ${hover} {
    &:hover {
      color: ${colors.elements};
    }
  }
  span,
  b {
    cursor: pointer;
  }
  b {
    font-size: 1.2em;
    font-weight: bolder;
  }
  span {
    font-weight: lighter;
  }
`;
