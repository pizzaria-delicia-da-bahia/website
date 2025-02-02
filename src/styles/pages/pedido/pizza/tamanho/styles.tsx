import styled from "styled-components";
import { breakpointsMQ, hover } from "@styles/mediaQueries";
import { sizes } from "@styles/sizes";
import { colors } from "@styles/colors";

export const TamanhoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  height: 100%;
  padding: 0 0 50px 0;

  .menu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.2rem;

    .value {
      font-size: 1rem;
    }
    .description {
      font-size: min(0.7rem, 4vw);
    }
  }

  @media ${breakpointsMQ.tabletUp} {
    gap: 1rem;
    height: 100%;

    .bottom-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem 0.2rem;

      .value {
        font-size: 1rem;
      }
    }
  }
`;
