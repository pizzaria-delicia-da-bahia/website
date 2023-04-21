import { colors } from "@styles/colors";
import styled from "styled-components";

export const DotsStyle = styled.div`
  display: flex;
  gap: 0.2rem;
  span {
    background-color: ${colors.elements};
    border: 1px solid #000;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
`;
