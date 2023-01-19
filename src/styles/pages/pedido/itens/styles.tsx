import styled from "styled-components";
import { breakpointsMQ, hover } from "../../../mediaQueries";
import { sizes } from "../../../sizes";
import { colors } from "../../../colors";

export const ItensStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0.5rem calc(${sizes.footer}px + ${sizes.header}px + 2rem) 0.5rem;
  gap: 2.5rem;
  overflow: hidden;
`;
