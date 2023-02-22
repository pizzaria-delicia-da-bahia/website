import styled from "styled-components";
import { sizes } from "@styles/sizes";

export const PageStyle = styled.main`
  flex-grow: 1;
  height: 100%;
  width: 100%;
  padding-bottom: ${sizes.footer}px;
  padding-top: ${sizes.header}px;
  position: fixed;
`;
