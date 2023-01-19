import styled from "styled-components";
import { Button, ButtonPrimary } from "../../styles/components/buttons";
import { sizes } from "../../styles/sizes";

export const FloatButton = styled(ButtonPrimary)`
  position: fixed;
  bottom: ${sizes.footer}px;
  right: 0;
  margin: 0 1rem 1rem 0%;
  width: min(9em);
  height: min(9em);
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  transition: all 0.2s;
  padding: 0;

  p {
    font-size: 0.9rem;
  }
  b {
    font-size: 1.5rem;
    font-weight: 800;
  }

  &.hidden {
    display: none;
  }
`;
