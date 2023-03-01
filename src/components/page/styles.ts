import styled from "styled-components";
import { sizes } from "@styles/sizes";

export const PageStyle = styled.main`
  flex-grow: 1;
  z-index: 1;
  height: calc(100% - ${sizes.header}px - ${sizes.footer}px);
  width: 100%;
  top: ${sizes.header}px;
  /* padding-bottom: ${sizes.footer}px;
  padding-top: ${sizes.header}px; */
  position: fixed;
  /* background-color: blue; */
`;
